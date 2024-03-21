import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { checkingCredentials, login, clearErrorMessage, logout } from "@/redux";
import Swal from "sweetalert2";

export const useAuthStore = () => {
  const { user, errorMessage, status } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const startLogin = async ({ email, password }) => {
    dispatch(checkingCredentials());
    try {
      const { data } = await axios.post(
        "http://localhost:8099/api/dominguez/auth/login",
        {
          email,
          password,
        }
      );
      console.log(data)
      localStorage.setItem("Bearer", data?.token);
      localStorage.setItem("token-init-date", new Date().getTime());
      dispatch(login(data));
      Swal.fire("Inicio de sesión exitoso", "Bienvenido", "success");
    } catch (error) {
      dispatch(logout("Usuario o contraseña incorrectos"));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 100);
      console.log(error);
    }
  };

  const startRegister = async (cliente) => {
    dispatch(checkingCredentials());
    try {
      const { data } = await axios.post(
        "http://localhost:8099/api/dominguez/clientes",
        cliente
      );

      localStorage.setItem("Bearer", data?.token);
      localStorage.setItem("token-init-date", new Date().getTime());
      dispatch(login(data));
    } catch (error) {
      dispatch(
        logout(error.response.data.message || "Error al registrar el usuario")
      );
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 100);
    }
  };

  const startLogout = () => {
    Swal.fire("Cerrando sesión", "Hasta luego", "success");
    localStorage.clear();
    dispatch(logout());
  };

  return {
    user,
    errorMessage,
    status,

    /* Métodos */
    startLogin,
    startRegister,
    startLogout
  };
};
