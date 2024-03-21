import { createSlice } from "@reduxjs/toolkit";

export const clienteSlice = createSlice({
  name: "clientes",
  initialState: {
    cliente: {},
    clientes: [],
    loading: false,
    errorMessage: null,
  },
  reducers: {
    setCliente: (state, action) => {
      state.cliente = action.payload;
    },
    setClientes: (state, action) => {
      state.clientes = action.payload;
    },
    agregarCliente: (state, { payload }) => {
      state.clientes.push(payload);
    },
    eliminarCliente: (state, { payload }) => {
      state.clientes = state.clientes.filter(
        (cliente) => cliente.id !== payload
      );
    },
    actualizarCliente: (state, { payload }) => {
      const clienteActualizar = payload;
      // Busca el cliente actualizado en la lista de clientes y actualizarlo
      state.clientes = state.clientes.map((cliente) =>
        cliente.id === clienteActualizar.id ? clienteActualizar : cliente
      );
      // Actualiza el cliente seleccionado
      if (state.cliente && state.cliente.id === clienteActualizar.id) {
        state.cliente = clienteActualizar;
      }
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.errorMessage = action.payload;
    },
  },
});

export const {
  setCliente,
  setClientes,
  setLoading,
  setError,
  agregarCliente,
  eliminarCliente,
  actualizarCliente,
} = clienteSlice.actions;
