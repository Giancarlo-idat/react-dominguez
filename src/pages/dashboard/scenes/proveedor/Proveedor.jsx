import { useNavigate } from "react-router-dom";
import { Box, useTheme, CircularProgress } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import { tokens } from "../../theme";
import { Header } from "../../components";
import { ProveedorTable } from "./";
import AddIcon from "@mui/icons-material/Add";
import { useProveedorContext } from "@/context";

export const Proveedor = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = ProveedorTable(colors);
  const { proveedores, loading } = useProveedorContext();
  const navigate = useNavigate();

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Proveedores" subtitle="Mantenimiento de proveedores" />
        <Button
          sx={{
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
          }}
          startIcon={<AddIcon />}
          onClick={() => navigate("/dashboard/auth/registerProveedor")}
        >
          Agregar Proveedor
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
          <DataGrid checkboxSelection rows={proveedores} columns={columns} />
        </Box>
      )}
    </Box>
  );
};
