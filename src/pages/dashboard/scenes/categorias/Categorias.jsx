import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Box, useTheme, CircularProgress } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { Header } from "../../components";
import { CategoriasTable } from "./";
import Button from "@mui/material/Button";
import { useCategoriesContext } from "@/context";
import AddIcon from "@mui/icons-material/Add";

export const Categorias = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const {
    categories,
    deleteCategoria,
    actualizarCategoria,
    errorMessage,
    loading,
  } = useCategoriesContext();

  const navigate = useNavigate();

  const handleDeleteCategoria = async (id) => {
    try {
      await deleteCategoria(id);
    } catch (error) {
      errorMessage("No se pudo eliminar la categoría" + error);
    }
  };

  const handleUpdateCategoria = async (id, newData) => {
    try {
      await actualizarCategoria(id, newData);
    } catch (error) {
      errorMessage("No se pudo actualizar la categoría" + error);
    }
  };

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Categorías" subtitle="Mantenimiento de categorías" />
        <Button
          sx={{
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
          }}
          startIcon={<AddIcon />}
          onClick={() => navigate("/dashboard/auth/addCategoria")}
        >
          Agregar categoría
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
          <DataGrid
            checkboxSelection
            rows={categories}
            columns={CategoriasTable({
              colors,
              handleUpdate: handleUpdateCategoria,
              handleDelete: handleDeleteCategoria,
            })}
          />
        </Box>
      )}
    </Box>
  );
};
