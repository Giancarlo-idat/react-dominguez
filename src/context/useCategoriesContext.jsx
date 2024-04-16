import { createContext, useContext, useEffect, useState } from "react";
import { dominguezApi } from "../api";
import Swal from "sweetalert2";

const CategoriesContext = createContext();

export const CategoriesProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [categoria, setCategoria] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(undefined);

  const getCategories = async () => {
    try {
      const { data } = await dominguezApi.get("/categorias");
      setCategories(data);
    } catch (error) {
      setErrorMessage(
        "No se pudo cargar la información de las categorias" + error
      );
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getCategoria = async (id) => {
    try {
      const { data } = await dominguezApi.get(`/categorias/${id}`);
      console.log(data);
      setCategoria(data);
    } catch (error) {
      if (error.response) {
        setError("No se pudo crear el proveedor" + error.response.data.message);
      } else if (error.request) {
        setError("Error al realizar la solicitud" + error.request);
      } else {
        setError("Comuniquese con el administrador " + error.message);
      }
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const createCategoria = async (categoria) => {
    try {
      const { data } = await dominguezApi.post("/categorias", categoria);
      console.log(data);
      setCategories((prev) => [...prev, data]);
    } catch (error) {
      if (error.response) {
        setError("No se pudo crear el proveedor" + error.response.data.message);
      } else if (error.request) {
        setError("Error al realizar la solicitud" + error.request);
      } else {
        setError("Comuniquese con el administrador " + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const actualizarCategoria = async (id, categoria) => {
    try {
      const { data } = await dominguezApi.put(`/categorias/${id}`, categoria);
      console.log(data);
      setCategories((prev) => {
        const index = prev.findIndex((c) => c.id === categoria.id);
        prev[index] = data;
        return [...prev];
      });
    } catch (error) {
      if (error.response) {
        setError(
          "No se pudo actualizar el proveedor: " + error.response.data.message
        );
      } else if (error.request) {
        setError("Error al realizar la solicitud: " + error.request);
      } else {
        setError("Error desconocido: " + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const deleteCategoria = async (id) => {
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

    // Si el usuario confirma la eliminación
    if (confirmDelete.isConfirmed) {
      try {
        await dominguezApi.delete(`/categorias/${id}`);
        // Actualizar el estado de las categorías después de la eliminación
        setCategories((prev) => prev.filter((c) => c.id !== id));
        // Mostrar una alerta de éxito
        Swal.fire("Eliminado", "La categoría ha sido eliminada.", "success");
      } catch (error) {
        if (error.response) {
          setError(
            "No se pudo actualizar el proveedor: " + error.response.data.message
          );
        } else if (error.request) {
          setError("Error al realizar la solicitud: " + error.request);
        } else {
          setError("Error desconocido: " + error.message);
        }
      } finally {
        // Independientemente del resultado, detener el estado de carga
        setLoading(false);
      }
    }
  };
  const habilitarCategoria = async (id) => {
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
        const { data } = await dominguezApi.put(`/categorias/habilitar/${id}`);
        console.log(data);
        setCategories((prev) => {
          const index = prev.findIndex((c) => c.id === id);
          prev[index] = data;
          return [...prev];
        });
      } catch (error) {
        if (error.response) {
          setError(
            "No se pudo actualizar el proveedor: " + error.response.data.message
          );
        } else if (error.request) {
          setError("Error al realizar la solicitud: " + error.request);
        } else {
          setError("Error desconocido: " + error.message);
        }
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <CategoriesContext.Provider
      value={{
        categories,
        categoria,
        loading,
        errorMessage,
        getCategories,
        getCategoria,
        createCategoria,
        actualizarCategoria,
        deleteCategoria,
        habilitarCategoria,
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
};

export const useCategoriesContext = () => {
  const context = useContext(CategoriesContext);
  if (!context) {
    throw new Error(
      "useCategoriesContext must be used within a CategoriesProvider"
    );
  }
  return context;
};
