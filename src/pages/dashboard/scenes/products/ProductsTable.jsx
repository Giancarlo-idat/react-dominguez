export const ProductsTable = (colors) => [
  { field: "id", headerName: "ID", flex: 1.5, editable: false },
  {
    field: "modelo",
    headerName: "Modelo",
    flex: 1.5,
    cellClassName: "name-column--cell",
  },
  {
    field: "descripcion",
    headerName: "Descripcion",
    flex: 1.5,
    cellClassName: "name-column--cell",
  },
  {
    field: "precio",
    headerName: "Precio",
    flex: 1,
    cellClassName: "name-column--cell",
  },
  {
    field: "marca",
    headerName: "Marca",
    flex: 1,
    cellClassName: "name-column--cell",
  },
  {
    field: "stock",
    headerName: "Stock",
    flex: 1,
    cellClassName: "name-column--cell",
  },
  {
    field: "imagen",
    headerName: "Imagen",
    flex: 1,
    cellClassName: "name-column--cell",
  },
  {
    field: "categoria",
    headerName: "Categoria",
    flex: 1,
    cellClassName: "name-column--cell",
    valueGetter: (params) => params?.row?.categoria?.nombre || "",
  },
  {
    field: "fichaTecnica",
    headerName: "Ficha Técnica",
    flex: 1.5,
    cellClassName: "name-column--cell",
    renderCell: (params) => (
      <pre>{JSON.stringify(params?.row?.fichaTecnica, null, 2)}</pre>
    ),
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
