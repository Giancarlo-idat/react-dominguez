import { Box, Typography } from "@mui/material";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";

export const ClientesTable = (colors) => [
  { field: "id", headerName: "ID", flex: 1.5 },
  {
    field: "nombres",
    headerName: "Nombres",
    flex: 1.5,
    cellClassName: "name-column--cell",
  },
  {
    field: "apellidos",
    headerName: "Apellidos",
    flex: 1.5,
    cellClassName: "name-column--cell",
  },
  {
    field: "direccion",
    headerName: "Direccion",
    flex: 1,
    cellClassName: "name-column--cell",
  },
  {
    field: "email",
    headerName: "Email",
    flex: 1.5,
  },
  {
    field: "password",
    headerName: "Contraseña",
    flex: 1,
  },
  {
    field: "telefono",
    headerName: "Telefono",
    flex: 1,
    cellClassName: "name-column--cell",
  },
  {
    field: "tipoDocumento",
    headerName: "Tipo Doc.",
    flex: 0.5,
    valueGetter: (params) => params?.row?.tipoDocumento?.nombre || "", // Obtener el nombre del tipo de documento si existe
  },
  { field: "numeroDocumento", headerName: "N° de Documento", flex: 1 },
  { field: "sexo", headerName: "Sexo" },
  {
    field: "rol",
    headerName: "Rol",
    valueGetter: (params) => params?.row?.rol?.nombre || "",
    flex: 1,
    renderCell: ({ row }) => {
      const rolNombre = row?.rol?.nombre || ""; // Obtener el nombre del rol
      return (
        <Box
          width="100%"
          m="0 auto"
          p="8px"
          display="flex"
          justifyContent="center"
          backgroundColor={
            rolNombre === "Administrador"
              ? colors.greenAccent[600]
              : rolNombre === "Cliente"
              ? colors.greenAccent[700]
              : colors.greenAccent[700]
          }
          borderRadius="4px"
        >
          {rolNombre === "Administrador" && <AdminPanelSettingsOutlinedIcon />}
          {rolNombre === "Cliente" && <LockOpenOutlinedIcon />}
          <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
            {rolNombre}
          </Typography>
        </Box>
      );
    },
  },
  {
    field: "fechaCreacion",
    headerName: "Fecha de registro",
    flex: 1,
  },
  {
    field: "fechaActualizacion",
    headerName: "Fecha de actualizacion",
    flex: 1,
  },
  {
    field: "estado",
    headerName: "Estado",
    valueGetter: (params) => (params.row.estado ? "Activo" : "Inactivo"),
    flex: 1,
  },
];
