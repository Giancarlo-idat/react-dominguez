import { createSlice } from "@reduxjs/toolkit";

export const tipoDocumentoSlice = createSlice({
  name: "tipoDocumento",
  initialState: {
    tipoDocumento: [],
    errorMessage: null,
  },
  reducers: {
    setTIpoDocumento: (state, { payload }) => {
      state.tipoDocumento = payload;
    },
    error: (state, { payload }) => {
      state.errorMessage = payload;
    },
  },
});

export const { setTIpoDocumento, error } = tipoDocumentoSlice.actions;
