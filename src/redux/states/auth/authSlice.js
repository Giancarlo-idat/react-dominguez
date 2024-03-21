import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "not-authenticated",
  user: {},
  errorMessage: undefined,
};

const persistedState = JSON.parse(localStorage.getItem("authState"));
const initialAuthState = persistedState ? persistedState : initialState;

export const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login: (state, { payload }) => {
      state.status = "authenticated";
      state.user = payload;
      state.errorMessage = undefined;
      localStorage.setItem("authState", JSON.stringify(state));
    },

    logout: (state, { payload }) => {
      state.status = "not-authenticated";
      state.user = {};
      state.errorMessage = payload;
      localStorage.setItem("authState", JSON.stringify(state));

    },

    checkingCredentials: (state) => {
      state.status = "checking";
      state.errorMessage = undefined;
      state.user = {};
    },
    clearErrorMessage: (state) => {
      state.errorMessage = undefined;
    }
  },
});



export const { login, logout, checkingCredentials, clearErrorMessage } = authSlice.actions;
