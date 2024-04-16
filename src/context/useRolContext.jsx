import { createContext, useContext, useEffect, useState } from "react";
import { dominguezApi } from "../api";

const RolContext = createContext();

export const RolProvider = ({ children }) => {
  const [roles, setRoles] = useState([]);
  const [rol, setRol] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erroMessage, setErrorMessage] = useState(undefined);

  const getRoles = async () => {
    try {
      const { data } = await dominguezApi.get("/rol");
      setRoles(data);
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

  const getRol = async (id) => {
    try {
      const { data } = await dominguezApi.get(`/rol/${id}`);
      console.log(data);
      setRol(data);
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

  const createRol = async (rol) => {
    try {
      const { data } = await dominguezApi.post("/rol", rol);
      console.log(data);
      setRoles((prev) => [...prev, data]);
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
    }
  };

  const actualizarRol = async (id, rol) => {
    try {
      const { data } = await dominguezApi.put(`/rol/${id}`, rol);
      console.log(data);
      setRoles((prev) => {
        const index = prev.findIndex((r) => r.id === rol.id);
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

  const deleteRol = async (id) => {
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
        await dominguezApi.delete(`/rol/${id}`);
        setRoles((prev) => prev.filter((r) => r.id !== id));
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
    }
  };

  const habilitarRol = async (id) => {
    // Mostrar el cuadro de diálogo de confirmación de SweetAlert
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
        const { data } = await dominguezApi.put(`/rol/habilitar/${id}`);
        console.log(data);
        setRoles((prev) => {
          const index = prev.findIndex((r) => r.id === id);
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
    }
  };

  useEffect(() => {
    getRoles();
  }, []);

  return (
    <RolContext.Provider
      value={{
        roles,
        rol,
        loading,
        erroMessage,
        getRoles,
        getRol,
        createRol,
        actualizarRol,
        deleteRol,
        habilitarRol,
      }}
    >
      {children}
    </RolContext.Provider>
  );
};

export const useRolContext = () => {
  const context = useContext(RolContext);
  if (!context) {
    throw new Error("useRolContext must be used within a RolProvider");
  }
  return context;
};
