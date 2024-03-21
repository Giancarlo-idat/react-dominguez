import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const initialAuth = JSON.parse(localStorage.getItem("auth")) || {
    status: "not-authenticated",
    user: {},
  };
  const [auth, setAuth] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [user, setUser] = useState({});
  const [status, setStatus] = useState(initialAuth);
  const source = axios.CancelToken.source();

  const handleError = (error) => {
    setError(true);
    setErrorMessage(error.response?.data?.message || "Error desconocido");
  };

  const onLogin = async ({ email, password }) => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        "http://localhost:8099/api/dominguez/auth/login",
        {
          email,
          password,
        }
      );
      localStorage.setItem("Bearer", data?.token);
      localStorage.setItem("token-init-date", new Date().getTime());
      setAuth(data);
      setStatus("authenticated");
      setUser(data);
      Swal.fire("Inicio de sesión exitoso", "Bienvenido", "success");
    } catch (error) {
      Swal.fire("Error", "Usuario o contraseña incorrectos", "error");
      handleError(error);
      setLoading(false);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const onRegister = async (cliente) => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        "http://localhost:8099/api/dominguez/clientes",
        cliente
      );

      localStorage.setItem("Bearer", data?.token);
      localStorage.setItem("token-init-date", new Date().getTime());
      document.cookie = `Bearer=${data?.token}; HttpOnly; Secure; SameSite=Strict`;
      setAuth(data);
      setStatus("authenticated");
      setUser(data);
      setLoading(false);
    } catch (error) {
      handleError(error);
      if (axios.isCancel(error)) {
        console.log("Request canceled", error.message);
      } else {
        console.log("Error", error.message);
      }
      setLoading(false);
    }
  };

  const onLogout = () => {
    Swal.fire("Cerrando sesión", "Hasta luego", "success");
    localStorage.clear();
    setAuth({});
    setStatus("not-authenticated");
  };

  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem("Bearer");
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          if (decodedToken.exp * 1000 > Date.now()) {
            setAuth({ status: "authenticated", user: decodedToken });
            setStatus({ status: "authenticated" });
            setUser({ status: "authenticated", user: decodedToken });
          } else {
            localStorage.removeItem("Bearer");
          }
        } catch (error) {
          localStorage.removeItem("Bearer");
        }
      }
      setLoading(false);
    };

    checkAuthStatus();
  }, []);

  source.cancel("La solicitud fue cancelada.");

  return (
    <AuthContext.Provider
      value={{
        auth,
        loading,
        error,
        errorMessage,
        user,
        status,
        onLogin,
        onRegister,
        onLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
