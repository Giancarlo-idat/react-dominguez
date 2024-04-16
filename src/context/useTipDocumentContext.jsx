import { createContext, useContext, useEffect, useState } from "react";
import { dominguezApi } from "../api";

const TipDocumentContext = createContext();

export const TipoDocumentoProvider = ({ children }) => {
  const [tipoDocumentos, setTipoDocumentos] = useState([]);
  const [tipoDocumento, setTipoDocumento] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(undefined);

  const getTipoDocumentos = async () => {
    try {
      const { data } = await dominguezApi.get("/tipo-documento-identidad");
      setTipoDocumentos(data);
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

  const getTipoDocumento = async (id) => {
    try {
      const { data } = await dominguezApi.get(
        `/tipo-documento-identidad/${id}`
      );
      setTipoDocumento(data);
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

  const createTipoDocumento = async (tipoDocumento) => {
    try {
      const { data } = await dominguezApi.post(
        "/tipo-documento-identidad",
        tipoDocumento
      );
      setTipoDocumentos((prev) => [...prev, data]);
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

  const updateTipoDocumento = async (id, tipoDocumento) => {
    try {
      const { data } = await dominguezApi.put(
        `/tipo-documento-identidad/${id}`,
        tipoDocumento
      );
      setTipoDocumentos((prev) => {
        const index = prev.findIndex((e) => e.id === id);
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

  const deleteTipoDocumento = async (id) => {
    const confirmDelete = await Swal.fire({
      title: "¿Estás seguro?",
      text: "¡Eliminarás el tipo de documento!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminarlo",
      cancelButtonText: "Cancelar",
    });
    if (confirmDelete.isConfirmed) {
      try {
        await dominguezApi.delete(`/tipo-documento-identidad/${id}`);
        setTipoDocumentos((prev) => prev.filter((e) => e.id !== id));
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

  const habilitarTipoDocumento = async (id) => {
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
        const { data } = await dominguezApi.put(
          `/tipo-documento-identidad/habilitar/${id}`
        );
        setTipoDocumentos((prev) => {
          const index = prev.findIndex((e) => e.id === id);
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
    getTipoDocumentos();
  }, []);

  return (
    <TipDocumentContext.Provider
      value={{
        tipoDocumentos,
        tipoDocumento,
        loading,
        errorMessage,
        getTipoDocumento,
        createTipoDocumento,
        updateTipoDocumento,
        deleteTipoDocumento,
        habilitarTipoDocumento,
      }}
    >
      {children}
    </TipDocumentContext.Provider>
  );
};

export const useTipDocument = () => {
  const context = useContext(TipDocumentContext);
  if (!context) {
    throw new Error("useTipDocument must be used within a TipDocumentProvider");
  }
  return context;
};
