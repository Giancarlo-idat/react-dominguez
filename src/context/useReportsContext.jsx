import React, { createContext, useContext, useEffect, useState } from "react";
import dominguezApi from "@/api/dominguezApi";

const ReportsContext = createContext();

export const ReportsProvider = ({ children }) => {
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [reports, setReports] = useState(null);

  const downloadReportsExcel = async () => {
    try {
      setLoading(true);
      const response = await dominguezApi.get(
        "/reports/download/excel",
        { responseType: "blob" } // Establece el tipo de respuesta como 'blob' para archivos binarios
      );
  
      // Crea un objeto de URL para el blob y lo asigna a un enlace de descarga
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "reports.xlsx"); // Nombre del archivo de descarga
      document.body.appendChild(link);
      link.click();
  
      // Limpia el objeto de URL después de la descarga
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error al descargar el archivo Excel:", error);
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const downloadReportsPdf = async () => {
    try {
      setLoading(true);
      const { data } = await dominguezApi.get("/reports/download/pdf", {
        responseType: "blob", // Indica que la respuesta es un archivo binario (PDF)
      });
  
      // Crea una URL del objeto Blob recibido para descargar el PDF
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "ventas.pdf"); // Nombre del archivo
      document.body.appendChild(link);
      link.click();
  
      // Liberar recursos después de la descarga
      window.URL.revokeObjectURL(url);
  
      setReports(data); // Opcional: puedes establecer los datos del PDF en el estado si es necesario
    } catch (error) {
      console.error(error.message);
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ReportsContext.Provider
      value={{ errorMessage, loading, reports, downloadReportsExcel, downloadReportsPdf }}
    >
      {children}
    </ReportsContext.Provider>
  );
};

export const useReportsContext = () => {
  const context = useContext(ReportsContext);
  if (!context) {
    throw new Error("useReportsContext must be used within a ReportsContext");
  }
  return context;
};
