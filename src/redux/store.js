import { configureStore } from "@reduxjs/toolkit";
import {
  authSlice,
  clienteSlice,
  rolesSlice,
  tipoDocumentoSlice,
} from "./states";
import cartSlice from'./states/cart/cartSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    tipoDocumento: tipoDocumentoSlice.reducer,
    roles: rolesSlice.reducer,
    clientes: clienteSlice.reducer,
    cart: cartSlice,
  },
});
