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
          item.id === producto.id ? { ...item, stock: item.stock + 1 } : item
        )
      );
    } else {
      Swal.fire(
        "Producto agregado al carrito",
        "Se agregó a su carrito",
        "success"
      );
      setCart([...cart, { ...producto, stock: 1 }]);
    }
  };

  const eliminarProductoCarrito = (idProduct) => {
    Swal.fire(
      "Producto eliminado del carrito",
      "Se eliminó de su carrito",
      "success"
    );
    setCart(cart.filter((item) => item.id !== idProduct));
  };

  const incrementarCantidad = (idProduct) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === idProduct
          ? { ...item, stock: Math.min(item.stock + 1, 10) }
          : item
      )
    );
  };

  const decrementarCantidad = (idProduct) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === idProduct
          ? { ...item, stock: Math.max(item.stock - 1, 1) }
          : item
      )
    );
  };

  const calcularTotal = () => {
    let cantidad = 0;
    let precio = 0;
    cart.forEach((item) => {
      cantidad += item.stock;
      precio += item.stock * item.precio;
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
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
