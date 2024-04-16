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

export const initialValuesCategories = {
  nombre: "",
  descripcion: "",
  imagen: "",
};

export const validationCategoriaSchema = Yup.object().shape({
  nombre: Yup.string().required("El nombre es requerido"),
  descripcion: Yup.string().required("La descripción es requerida"),
  imagen: Yup.string().required("La imagen es requerida"),
});

export const initialValuesProveedor = {
  nombres: "",
  direccion: "",
  email: "",
  telefono: "",
  tipoDocumento: "",
  numeroDocumento: "",
};

export const validationProveedorSchema = Yup.object().shape({
  nombres: Yup.string().required("Los nombres son requeridos"),
  direccion: Yup.string().required("La dirección es requerida"),
  email: Yup.string()
    .email("El correo electrónico no es válido")
    .test("email", "El correo electrónico no es válido", (value) => {
      return emailRegex.test(value);
    })
    .required("El correo electrónico es requerido"),
  telefono: Yup.string().matches(
    /^[0-9]{9}$/,
    "El teléfono debe tener 9 dígitos"
  ),
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
});

export const initiaValuesProducts = {
  modelo: "",
  descripcion: "",
  precio: "",
  marca: "",
  stock: "",
  imagen: "",
  categoria: "",
  fichaTecnica: {},
};

export const validationProductsSchema = Yup.object().shape({
  modelo: Yup.string().required("El modelo es requerido"),
  descripcion: Yup.string().required("La descripción es requerida"),
  precio: Yup.number().required("El precio es requerido"),
  marca: Yup.string().required("La marca es requerida"),
  stock: Yup.number().required("El stock es requerido"),
  imagen: Yup.string().required("La imagen es requerida"),
  categoria: Yup.string().required("La categoria es requerida"),
  fichaTecnica: Yup.object()
    .required("La ficha técnica es requerida")
    .nullable(true),
});

export const initialValuesRol = {
  nombre: "",
  descripcion: "",
};

export const validationRolSchema = Yup.object().shape({
  nombre: Yup.string().required("El nombre es requerido"),
  descripcion: Yup.string().required("La descripción es requerida"),
});
