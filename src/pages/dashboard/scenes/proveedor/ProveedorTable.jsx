export const ProveedorTable = (colors) => [
  { field: "id", headerName: "ID", flex: 1 },
  {
    field: "nombres",
    headerName: "Nombre",
    flex: 1.5,
    cellClassName: "name-column--cell",
  },
  {
    field: "direccion",
    headerName: "Direccion",
    flex: 1.5,
    cellClassName: "name-column--cell",
  },
  {
    field: "email",
    headerName: "Email",
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
  { field: "telefono", headerName: "Telefono", flex: 1 },
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
