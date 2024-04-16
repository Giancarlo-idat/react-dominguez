import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const initialAuth = JSON.parse(localStorage.getItem("Bearer")) || {
    status: "not-authenticated",
    user: {},
  };
  const [auth, setAuth] = useState(initialAuth);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [user, setUser] = useState({});
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
      
      console.log(data);
      localStorage.setItem("Bearer", JSON.stringify(data.token));
      localStorage.setItem("token-init-date", new Date().getTime());
      setAuth({ status: "authenticated", user: data.user });
      setUser({ response: data });
      Swal.fire("Inicio de sesión exitoso", "Bienvenido", "success");
    } catch (error) {
      Swal.fire("Error", "Usuario o contraseña incorrectos", "error");
      handleError(error);
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
      Swal.fire("Registro exitoso", "Bienvenido", "success");
      setAuth({ status: "authenticated", user: data });
      setUser(data);
    } catch (error) {
      Swal.fire("Error", "No se pudo registrar el usuario", "error");
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const onLogout = () => {
    Swal.fire("Cerrando sesión", "Hasta luego", "success");
    localStorage.clear();
    setAuth({ status: "not-authenticated", user: {} });
  };

  const limpiarCarritoAlExpirarToken = () => {
    setCart([]);
    localStorage.setItem("cart", JSON.stringify([]));
  };
  
  useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem("Bearer");
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          if (decodedToken.exp * 1000 > Date.now()) {
            setAuth({ status: "authenticated", user: decodedToken });
          } else {
            localStorage.removeItem("Bearer");
            setAuth({ status: "not-authenticated", user: {} });
            limpiarCarritoAlExpirarToken();
          }
        } catch (error) {
          localStorage.removeItem("Bearer");
          setAuth({ status: "not-authenticated", user: {} });
        }
      } else {
        setAuth({ status: "not-authenticated", user: {} });
      }
      // Agregar un retardo antes de establecer loading en falso
      setTimeout(() => setLoading(false), 100);
    };
    checkAuthStatus();

    return () => {
      source.cancel("La solicitud fue cancelada.");
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        auth,
        loading,
        error,
        errorMessage,
        user,
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
