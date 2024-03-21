import * as Yup from "yup";

export const initialValues = {
  nombres: "",
  apellidos: "",
  email: "",
  password: "",
  direccion: "",
  sexo: "",
  tipoDocumento: "",
  numeroDocumento: "",
  telefono: "",
};

export const validationSchema = Yup.object().shape({
  nombres: Yup.string().required("Los nombres son requeridos"),
  apellidos: Yup.string().required("Los apellidos son requeridos"),
  email: Yup.string()
    .email("El correo electrónico no es válido")
    .test("email", "El correo electrónico no es válido", (value) => {
      return emailRegex.test(value);
    })
    .required("El correo electrónico es requerido"),
  password: Yup.string().required("La contraseña es requerida"),
  direccion: Yup.string().required("La dirección es requerida"),
  sexo: Yup.string().oneOf(["Masculino", "Femenino"]).nullable(),
  tipoDocumento: Yup.string().required("El tipo de documento es requerido"),
  numeroDocumento: Yup.string()
    .required("El número de documento es requerido")
    // si el cliente elige el select del tipo de documento en DNI la longitud sera 8 digitos
    // si el cliente elige el select del tipo de documento en RUC la longitud sera 11 digitos
    .test("numeroDocumento", "El número de documento no es válido", (value) => {
      return value.length === 8 || value.length === 11;
    })
    // Validacion si es un número
    .test("numeroDocumento", "El número de documento no es válido", (value) => {
      return !isNaN(value);
    }),
  telefono: Yup.string().matches(
    /^[0-9]{9}$/,
    "El teléfono debe tener 9 dígitos"
  ),
});

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i;
