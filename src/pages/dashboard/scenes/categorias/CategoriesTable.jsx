import { Box, Button, TextField } from "@mui/material";

export const CategoriasTable = ({ handleDelete, handleUpdate, colors, onEdit, editingRowId, editedData }) => [
  { field: "id", headerName: "ID", flex: 1, editable: false },
  {
    field: "nombre",
    headerName: "Nombre",
    flex: 0.5,
    cellClassName: "name-column--cell",
    editable: editingRowId !== null,
    renderCell: (params) => {
      if (params.row.id === editingRowId) {
        return (
          <TextField
            value={editedData.nombre}
            onChange={(e) => onEdit('nombre', e.target.value)}
          />
        );
      }
      return params.value;
    }
  },
  {
    field: "descripcion",
    headerName: "Descripcion",
    flex: 1.5,
    cellClassName: "name-column--cell",
    editable: editingRowId !== null,
    renderCell: (params) => {
      if (params.row.id === editingRowId) {
        return (
          <TextField
            value={editedData.descripcion}
            onChange={(e) => onEdit('descripcion', e.target.value)}
          />
        );
      }
      return params.value;
    }
  },
  {
    field: "fechaCreacion",
    headerName: "Fecha de registro",
    flex: 1,
    editable: false,
  },
  {
    field: "fechaActualizacion",
    headerName: "Fecha de actualizacion",
    flex: 1,
    editable: false,
  },
  {
    field: "estado",
    headerName: "Estado",
    valueGetter: (params) => (params.row.estado ? "Activo" : "Inactivo"),
    flex: 1,
    editable: false,
  },
  {
    field: "imagen",
    headerName: "Imagen",
    flex: 1,
    editable: false,
  },
  {
    field: "actions",
    headerName: "Acciones",
    flex: 1, // Flexibilidad del campo
    sortable: false,
    renderCell: (params) => (
      <Box display="flex" justifyContent="space-around">
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            onEdit(params.row.id, params.row.nombre, params.row.descripcion);
          }}
        >
          Editar
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => handleDelete(params.row.id)}
          disabled={!params.row.estado}
        >
          Eliminar
        </Button>
      </Box>
    ),
  },
];
