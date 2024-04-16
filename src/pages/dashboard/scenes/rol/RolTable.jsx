

export const RolTable = (colors) => [
  { field: "id", headerName: "ID", flex: 1.5 },
  {
    field: "nombre",
    headerName: "Nombre",
    flex: .5,
    cellClassName: "name-column--cell",
  },
  {
    field: "descripcion",
    headerName: "Descripcion",
    flex: 1.5,
    cellClassName: "name-column--cell",
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
