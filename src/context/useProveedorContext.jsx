import { createContext, useContext, useEffect, useState } from "react";
import { dominguezApi } from "../api";
import Swal from "sweetalert2";

const ProveedorContext = createContext();

export const ProveedorProvider = ({ children }) => {
  const [proveedores, setProveedores] = useState([]);
  const [proveedor, setProveedor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(undefined);

  const getProveedores = async () => {
    try {
      const { data } = await dominguezApi.get("/proveedor");
      setProveedores(data);
    } catch (error) {
      setError("No se pudo cargar la información de los proveedores" + error);
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getProveedor = async (id) => {
    try {
      const { data } = await dominguezApi.get(`/proveedor/${id}`);
      setProveedor(data);
    } catch (error) {
      setError("No se pudo cargar la información del proveedor" + error);
      console.log(error.message);
    }
  };

  const createProveedor = async (proveedor) => {
    try {
      const { data } = await dominguezApi.post("/proveedor", proveedor);
      setProveedores((prev) => [...prev, data]);
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

  const updateProveedor = async (id, proveedor) => {
    try {
      const { data } = await dominguezApi.put(`/proveedor/${id}`, proveedor);
      setProveedor((prev) => {
        const index = prev.findIndex((p) => p.id === proveedor.id);
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
    }
  };

  const deleteProveedor = async (id) => {
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
        await dominguezApi.delete(`/proveedor/${id}`);
        setProveedores((prev) => prev.filter((c) => c.id !== id));
      } catch (error) {
        if (error.response) {
          setError(
            "No se pudo eliminar el proveedor: " + error.response.data.message
          );
        } else if (error.request) {
          setError("Error al realizar la solicitud: " + error.request);
        } else {
          setError("Error desconocido: " + error.message);
        }
      }
    }
  };

  const habilitarProveedor = async (id) => {
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
        const { data } = await dominguezApi.put(`/proveedor/habilitar/${id}`);
        setProveedores((prev) => {
          const index = prev.findIndex((p) => p.id === id);
          prev[index] = data;
          return [...prev];
        });
      } catch (error) {
        if (error.response) {
          setError(
            "No se pudo habilitar el proveedor: " + error.response.data.message
          );
        } else if (error.request) {
          setError("Error al realizar la solicitud: " + error.request);
        } else {
          setError("Error desconocido: " + error.message);
        }
      }
    }
  };

  useEffect(() => {
    getProveedores();
  }, []);

  return (
    <ProveedorContext.Provider
      value={{
        proveedores,
        proveedor,
        loading,
        error,
        getProveedor,
        createProveedor,
        updateProveedor,
        deleteProveedor,
        habilitarProveedor,
      }}
    >
      {children}
    </ProveedorContext.Provider>
  );
};

export const useProveedorContext = () => {
  const context = useContext(ProveedorContext);
  if (!context)
    throw new Error(
      "useProveedorContext must be used within a ProveedorProvider"
    );
  return context;
};
