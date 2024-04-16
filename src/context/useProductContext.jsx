import { createContext, useContext, useEffect, useState } from "react";
import { dominguezApi } from "../api";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(undefined);

  const getProducts = async () => {
    try {
      setLoading(true);
      const { data } = await dominguezApi.get("/productos");
      setProducts(data);
    } catch (error) {
      if (error.response) {
        setErrorMessage(
          "No se pudo actualizar el proveedor: " + error.response.data.message
        );
      } else if (error.request) {
        setErrorMessage("Error al realizar la solicitud: " + error.request);
      } else {
        setErrorMessage("Error desconocido: " + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const getProduct = async (id) => {
    try {
      setLoading(true);
      const { data } = await dominguezApi.get(`/productos/${id}`);
      console.log(data)
      setProduct(data);
      setLoading(false);
    } catch (error) {
      if (error.response) {
        setErrorMessage(
          "No se pudo actualizar el proveedor: " + error.response.data.message
        );
      } else if (error.request) {
        setErrorMessage("Error al realizar la solicitud: " + error.request);
      } else {
        setErrorMessage("Error desconocido: " + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const createProduct = async (product) => {
    try {
      setLoading(true);
      const { data } = await dominguezApi.post("/productos", product);
      console.log(data);
      setProducts((prev) => [...prev, data]);
    } catch (error) {
      if (error.response) {
        setErrorMessage(
          "No se pudo crear el proveedor" + error.response.data.message
        );
      } else if (error.request) {
        setErrorMessage("Error al realizar la solicitud" + error.request);
      } else {
        setErrorMessage("Comuniquese con el administrador " + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async (id, product) => {
    try {
      setLoading(true);
      const { data } = await dominguezApi.put(`/productos/${id}`, product);
      console.log(data);
      setProducts((prev) => {
        const index = prev.findIndex((p) => p.id === product.id);
        prev[index] = data;
        return [...prev];
      });
    } catch (error) {
      if (error.response) {
        setErrorMessage(
          "No se pudo actualizar el proveedor: " + error.response.data.message
        );
      } else if (error.request) {
        setErrorMessage("Error al realizar la solicitud: " + error.request);
      } else {
        setErrorMessage("Error desconocido: " + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    // Mostrar el cuadro de diálogo de confirmación de SweetAlert
    const confirmDelete = await Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminarlo",
      cancelButtonText: "Cancelar",
    });
    if (confirmDelete.isConfirmed) {
      try {
        setLoading(true);
        await dominguezApi.delete(`/productos/${id}`);
        setProducts((prev) => prev.filter((p) => p.id !== id));
      } catch (error) {
        if (error.response) {
          setErrorMessage(
            "No se pudo eliminar el proveedor: " + error.response.data.message
          );
        } else if (error.request) {
          setErrorMessage("Error al realizar la solicitud: " + error.request);
        } else {
          setErrorMessage("Error desconocido: " + error.message);
        }
      } finally {
        setLoading(false);
      }
    }
  };

  const habilitarProduct = async (id) => {
    const confirmUpdate = await Swal.fire({
      title: "¿Estás seguro?",
      text: "¡Habilitarás el rol!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, habilitarlo",
      cancelButtonText: "Cancelar",
    });

    if (confirmUpdate.isConfirmed) {
      try {
        const { data } = await dominguezApi.put(`/productos/habilitar/${id}`);
        console.log(data);
        setProducts((prev) => {
          const index = prev.findIndex((p) => p.id === id);
          prev[index] = data;
          return [...prev];
        });
      } catch (error) {
        if (error.response) {
          setErrorMessage(
            "No se pudo habilitar el proveedor: " + error.response.data.message
          );
        } else if (error.request) {
          setErrorMessage("Error al realizar la solicitud: " + error.request);
        } else {
          setErrorMessage("Error desconocido: " + error.message);
        }
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        product,
        loading,
        errorMessage,
        createProduct,
        updateProduct,
        deleteProduct,
        habilitarProduct,
        getProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context)
    throw new Error("useProduct must be used within a ProductProvider");
  return context;
};
