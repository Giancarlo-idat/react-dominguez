import { Box, Button, CircularProgress, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { VentasTable } from "./";
import { useReportsContext, useDocVentaContext } from "@/context";
import { Header } from "../../components";
import AddIcon from "@mui/icons-material/Add";
import { useEffect } from "react";

export const DocVentas = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { downloadReportsExcel, downloadReportsPdf } = useReportsContext();
  const { docVenta,getDocVenta, loading } = useDocVentaContext();
  const columns = VentasTable(colors);

console.log(docVenta)

  const handleDowloandReport = async () => {
    try {
      await downloadReportsExcel();
    } catch (error) {
      console.log("No se pudo descargar el reporte" + error);
    }
  };

  useEffect(() => {
    getDocVenta()
  },[])

  return (
    <Box m="20px">
      <Header title="Ventas" subtitle="Lista de Ventas" />
      <Box display="flex" justifyContent="end" alignItems="center">
        <Button
          sx={{
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
            margin: "0 20px",
          }}
          startIcon={<AddIcon />}
          onClick={handleDowloandReport}
        >
          Descargar reporte EXCEL
        </Button>
      </Box>
      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="75vh"
        >
          <CircularProgress />
        </Box>
      ) : (
        <Box
          m="40px 0 0 0"
          height="75vh"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .name-column--cell": {
              color: colors.greenAccent[300],
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: colors.blueAccent[700],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: colors.primary[400],
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              backgroundColor: colors.blueAccent[700],
            },
            "& .MuiCheckbox-root": {
              color: `${colors.greenAccent[200]} !important`,
            },
          }}
        >
          <DataGrid checkboxSelection rows={docVenta} columns={columns} />
        </Box>
      )}
    </Box>
  );
};
