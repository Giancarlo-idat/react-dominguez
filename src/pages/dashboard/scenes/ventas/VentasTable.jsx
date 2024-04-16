export const VentasTable = (colors) => [
  { field: "id", headerName: "Documento de venta", flex: 1.5 },
  {
    field: "cliente",
    headerName: "Cliente",
    flex: 1.5,
    valueGetter: (params) =>
      params?.row?.cliente?.nombres + " " + params?.row?.cliente?.apellidos ||
      "", // Obtener el nombre del tipo de documento si existe
  },
  {
    field: "numComprobante",
    headerName: "Numero Comprobante",
    flex: 1.5,
    cellClassName: "name-column--cell",
  },
  {
    field: "fechaEnvio",
    headerName: "Fecha Envio",
    flex: 1.5,
    cellClassName: "name-column--cell",
  },
  {
    field: "fechaEntrega",
    headerName: "Fecha Entrega",
    flex: 1.5,
    cellClassName: "name-column--cell",
  },
  {
    field: "tipoTransaccion",
    headerName: "Tipo Transaccion",
    flex: 1.5,
    valueGetter: (params) => params?.row?.tipoTransaccion?.nombre || "", // Obtener el nombre del tipo de documento si existe
  },

  {
    field: "estadoEnvio",
    headerName: "Estado de envio",
    flex: 1.5,
  },
  {
    field: "igv",
    headerName: "Igv",
    flex: 1.5,
  },
  {
    field: "detallesVenta",
    headerName: "Detalles",
    flex: 2.5,
    valueGetter: (params) => {
      const detallesVenta = params?.row?.detallesVenta;
      if (detallesVenta) {
        const modelosSet = new Set(); // Conjunto para realizar un seguimiento de los modelos únicos
        const detalles = detallesVenta.map((prod) => {
          const modelo = prod.productos.modelo;
          const cantidad = prod.cantidad;
          const marca = prod.productos.marca;
          if (!modelosSet.has(modelo)) {
            // Verificar si el modelo ya ha sido agregado
            modelosSet.add(modelo); // Agregar el modelo al conjunto
            return modelo + " " + cantidad + " " + marca;
          }
          return null; // Si el modelo ya se ha agregado, devolver null
        });
        return detalles.filter(Boolean).join(", "); // Filtrar los elementos nulos y unir los detalles con una coma
      }
      return "";
    },
  },
  {
    field: "precioTotal",
    headerName: "Precio total",
    flex: 1,
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
];
