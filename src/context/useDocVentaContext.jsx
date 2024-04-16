import { createContext, useContext, useEffect, useState } from "react";
import { dominguezApi } from "@/api";

const DocVentaContext = createContext();

export const DocVentaProvider = ({ children }) => {
  const [docVenta, setDocVenta] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(undefined);

  const getDocVenta = async () => {
    try {
      const { data } = await dominguezApi.get("/document/docventa");
      setDocVenta(data);
    } catch (error) {
      if (error.response) {
        setErrorMessage("No se pudo crear el proveedor" + error.response.data.message);
      } else if (error.request) {
        setErrorMessage("Error al realizar la solicitud" + error.request);
      } else {
        setErrorMessage("Comuniquese con el administrador " + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const agregarDocVenta = async (nuevaDocVenta) => {
    try {
      const { data } = await dominguezApi.post(
        "/document/docventa",
        nuevaDocVenta
      );
      console.log(data);
      // Actualizar el estado con la nueva docVenta agregada
      setDocVenta([...docVenta, data]);
      return data;
    } catch (error) {
      if (error.response) {
        setErrorMessage("No se pudo crear el proveedor" + error.response.data.message);
      } else if (error.request) {
        setErrorMessage("Error al realizar la solicitud" + error.request);
      } else {
        setErrorMessage("Comuniquese con el administrador " + error.message);
      }
    } finally {
      setLoading(false);
    }
  };


  return (
    <DocVentaContext.Provider
      value={{
        docVenta,
        agregarDocVenta,
        getDocVenta,
        errorMessage,
        loading,
      }}
    >
      {children}
    </DocVentaContext.Provider>
  );
};

export const useDocVentaContext = () => {
  const context = useContext(DocVentaContext);
  if (!context) {
    throw new Error("useDocVenta must be used within a DocVentaProvider");
  }
  return context;
};
