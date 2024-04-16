import React, { createContext, useContext, useEffect, useState } from "react";
import { dominguezApi } from "../api";

const EmployeeContext = createContext();

export const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);
  const [employee, setEmployee] = useState(null);
  const [employeeProfile, setEmployeeProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(undefined);

  useEffect(() => {
    const fetchEmployeeProfile = async () => {
      try {
        const { data } = await dominguezApi.get("/profile/info/employee");
        console.log(data)
        setEmployeeProfile(data);
      } catch (error) {
        console.log(error.message);
        setErrorMessage(error.message);
      }
    };

    fetchEmployeeProfile();
  }, []);

  const getEmployees = async () => {
    try {
      const { data } = await dominguezApi.get("/empleados");
      setEmployees(data);
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

  const getEmployee = async (id) => {
    try {
      const { data } = await dominguezApi.get(`/empleados/${id}`);
      setEmployee(data);
      console.log(data);
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

  const createEmployee = async (employee) => {
    try {
      const { data } = await dominguezApi.post("/empleados", employee);
      console.log(data);
      setEmployees((prev) => [...prev, data]);
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

  const updateEmployee = async (id, employee) => {
    try {
      const { data } = await dominguezApi.put(`/empleados/${id}`, employee);
      console.log(data);
      setEmployees((prev) => {
        const index = prev.findIndex((e) => e.id === employee.id);
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

  const deleteEmployee = async (id) => {
    try {
      await dominguezApi.delete(`/empleados/${id}`);
      setEmployees((prev) => prev.filter((e) => e.id !== id));
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

  const habilitarEmpleado = async (id) => {
    try {
      const { data } = await dominguezApi.put(`/empleados/habilitar/${id}`);
      console.log(data);
      setEmployees((prev) => {
        const index = prev.findIndex((e) => e.id === id);
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
    getEmployees();
  }, []);

  return (
    <EmployeeContext.Provider
      value={{
        employees,
        employee,
        employeeProfile,
        loading,
        errorMessage,
        getEmployees,
        getEmployee,
        createEmployee,
        updateEmployee,
        deleteEmployee,
        habilitarEmpleado,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployeeContext = () => {
  const context = useContext(EmployeeContext);
  if (!context) {
    throw new Error(
      "useEmployeeProfile must be used within an EmployeeProfileProvider"
    );
  }
  return context;
};
