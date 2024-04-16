import { createContext, useContext, useEffect, useState } from "react";
import { dominguezApi } from "../api";

const ClienteContext = createContext();

export const ClientProvider = ({ children }) => {
  const [clients, setClients] = useState([]);
  const [client, setClient] = useState(null);
  const [ clientProfile, setEmployeeProfile ] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(undefined);

  useEffect(() => {
    const fetchClientProfile = async () => {
      try {
        const { data } = await dominguezApi.get("/profile/info/client");
        setEmployeeProfile(data);
      } catch (error) {
        console.log(error.message);
        setError(error.message);
      }
    };

    fetchClientProfile();
  }, []);

  const getClients = async () => {
    try {
      const { data } = await dominguezApi.get("/clientes");
      setClients(data);
    } catch (error) {
      setError("No se pudo cargar la información del cliente" + error);
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getClient = async (id) => {
    try {
      const { data } = await dominguezApi.get(`/clientes/${id}`);
      setClient(data);
    } catch (error) {
      setError("No se pudo cargar la información del cliente" + error);
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const createClient = async (client) => {
    try {
      const { data } = await dominguezApi.post("/clientes", client);
      console.log(data);
      setClients((prev) => [...prev, data]);
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

  const updateClient = async (id, client) => {
    try {
      const { data } = await dominguezApi.put(`/clientes/${id}`, client);
      console.log(data);
      setClient((prev) => {
        const index = prev.findIndex((c) => c.id === client.id);
        prev[index] = data;
        return [...prev];
      });
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

  const deleteClient = async (id) => {
    try {
      await dominguezApi.delete(`/clientes/${id}`);
      setClient((prev) => prev.filter((c) => c.id !== id));
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

  const habilitarCliente = async (id) => {
    try {
      const { data } = await dominguezApi.put(`/clientes/habilitar/${id}`);
      console.log(data);
      setClient((prev) => {
        const index = prev.findIndex((c) => c.id === id);
        prev[index] = data;
        return [...prev];
      });
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

  useEffect(() => {
    getClients();
  }, []);

  return (
    <ClienteContext.Provider
      value={{
        clients,
        client,
        clientProfile,
        getClients,
        getClient,
        loading,
        error,
        createClient,
        updateClient,
        deleteClient,
        habilitarCliente,
      }}
    >
      {children}
    </ClienteContext.Provider>
  );
};

export const useClientContext = () => {
  const context = useContext(ClienteContext);
  if (!context)
    throw new Error("useClient must be used within a ClientProvider");
  return context;
};
