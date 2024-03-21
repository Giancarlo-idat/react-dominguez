import {
  agregarCliente,
  setCliente,
  setClientes,
  setError,
  setLoading,
} from ".";
import axios from "axios";
import Swal from "sweetalert2";

export const buscarClientes = () => async (dispatch) => {
  const token =
    "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJpbXBvcnRhY2lvbmVzRG9taW5ndWV6MjAyNEBnbWFpbC5jb20iLCJyb2xlcyI6WyJST0xFX0FkbWluIl0sImlhdCI6MTcxMDU1NDI0OSwiZXhwIjoxNzEwNjQwNjQ5fQ.7OxrNbd6rNmRNIB-ml65SSxzFGXQA2y5oBFvD-UrI-w";

  try {
    dispatch(setLoading(true));

    const response = await axios.get(
      "http://localhost:8099/api/dominguez/clientes",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch(setClientes(response.data));
    dispatch(agregarCliente(response.data));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setLoading(false));
  }
};

export const buscarCliente = (id) => async (dispatch) => {
  const token =
    "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJpbXBvcnRhY2lvbmVzRG9taW5ndWV6MjAyNEBnbWFpbC5jb20iLCJyb2xlcyI6WyJST0xFX0FkbWluIl0sImlhdCI6MTcxMDU1NDI0OSwiZXhwIjoxNzEwNjQwNjQ5fQ.7OxrNbd6rNmRNIB-ml65SSxzFGXQA2y5oBFvD-UrI-w";

  try {
    dispatch(setLoading(true));

    const response = await axios.get(
      `http://localhost:8099/api/dominguez/clientes/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch(setCliente(response.data));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setLoading(false));
  }
};

export const crearCliente = (cliente) => async (dispatch) => {
  try {
    dispatch(setLoading(true));

    const token =
      "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJpbXBvcnRhY2lvbmVzRG9taW5ndWV6MjAyNEBnbWFpbC5jb20iLCJyb2xlcyI6WyJST0xFX0FkbWluIl0sImlhdCI6MTcxMDYwNTkxNSwiZXhwIjoxNzEwNjkyMzE1fQ.WAWwa9lSmPxxiXGtI9S9Jz-wM3I0UsE4DhAXWEA4lIM";
    const response = await axios.post(
      "http://localhost:8099/api/dominguez/clientes",
      cliente,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    Swal.fire({
      icon: "success",
      title: "Cliente creado",
      text: "El cliente fue creado exitosamente",
    });

    console.log("Cliente creado", response.data);

    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setLoading(false));
    console.log(`${error.message}`);

    Swal.fire({
      icon: "error",
      title: "Error al crear cliente.",
      text: `Ocurrió un error al intentar crear el cliente.`,
    });
  }
};

/* ${localStorage.getItem('token')} */
