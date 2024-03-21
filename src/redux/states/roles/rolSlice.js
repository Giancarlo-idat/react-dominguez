import { createSlice } from "@reduxjs/toolkit";

export const rolesSlice = createSlice({
  name: "roles",
  initialState: {
    roles: [],
    errorMessage: null,
  },

  reducers: {
    setRoles: (state, { payload }) => {
      state.roles = payload;
    },
    error: (state, { payload }) => {
      state.errorMessage = payload;
    },
  },
});

export const { setRoles, error } = rolesSlice.actions;
