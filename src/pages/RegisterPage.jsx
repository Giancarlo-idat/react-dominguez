import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { useAuthStore } from "@/hooks";
import { fetchTipoDocumento } from "@/redux";
import { validationSchema, initialValues } from "@/utilities";
import LogoDominguez from "../assets/images/logo_dominguez.png";
import {
  GiftIcon,
  NotificationIcon,
  StarIcon,
  StickyNoteIcon,
} from "../components";

export const RegisterPage = () => {
 

  const { handleSubmit, values, touched, handleBlur, errors, handleChange } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit: async (values) => {
        try {
          const selectedTipoDocumento = tipoDocumento.find(
            (doc) => doc.id === values.tipoDocumento
          );

          if (!selectedTipoDocumento) {
            console.error("Error: Tipo de documento no encontrado");
            return;
          }

          const formattedData = {
            nombres: values.nombres,
            apellidos: values.apellidos,
            direccion: values.direccion,
            telefono: values.telefono,
            email: values.email,
            password: values.password,
            tipoDocumento: {
              id: selectedTipoDocumento.id,
              nombre: selectedTipoDocumento.nombre,
            },
            numeroDocumento: values.numeroDocumento,
            sexo: values.sexo,
          };

          await startRegister(formattedData);

          console.log("Datos enviados:", formattedData);
        } catch (error) {
          console.log(error.message);
        }
      },
    });
  

  return (
    <div className="register">
      <div className="register__container">
        <div className="register__container__logo">
          <img src={LogoDominguez} alt="logo" />
        </div>

        <div className="register__container__content">
          <div className="register__container__content--form">
            <h2 className="title">Regístrate</h2>

            <form onSubmit={handleSubmit}>
              <label htmlFor="nombres">Nombres: </label>
              <input
                name="nombres"
                className="input"
                type="text"
                placeholder="Ingresa tus nombres"
                value={values.nombres}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.nombres && errors.nombres ? (
                <div className="error-message">{errors.nombres}</div>
              ) : null}
              <label htmlFor="apellidos">Apellidos: </label>
              <input
                name="apellidos"
                className="input"
                type="text"
                placeholder="Ingresa tus apellidos"
                value={values.apellidos}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.apellidos && errors.apellidos ? (
                <div className="error-message">{errors.apellidos}</div>
              ) : null}
              <label htmlFor="direccion">Dirección: </label>
              <input
                className="input"
                type="text"
                name="direccion"
                placeholder="Ingresa tu dirección"
                value={values.direccion}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.direccion && errors.direccion ? (
                <div className="error-message">{errors.numeroDocumento}</div>
              ) : null}
              <label htmlFor="sexo">Seleccione su sexo: </label>
              <select
                name="sexo"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.sexo}
                className="sexo"
              >
                <option value="" disabled>
                  Seleccione una opción
                </option>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
              </select>
              {touched.sexo && errors.sexo ? (
                <div className="error-message">{errors.sexo}</div>
              ) : null}
             {/*  <label htmlFor="tipoDocumento">Tipo de documento:</label>
              <select
                name="tipoDocumento"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.tipoDocumento}
                className="tipoDocumento"
              >
                <option value="" disabled>
                  Seleccione una opción
                </option>
                {tipoDocumento &&
                  Object.values(tipoDocumento).map((documento) => (
                    <option key={documento.id} value={documento.id}>
                      {documento.nombre}
                    </option>
                  ))}
              </select>

              {touched.tipoDocumento && errors.tipoDocumento ? (
                <div className="error-message">{errors.tipoDocumento}</div>
              ) : null}
 */}
              <label htmlFor="numeroDocumento">N° de documento: </label>
              <input
                name="numeroDocumento"
                className="input"
                type="text"
                placeholder="DNI"
                value={values.numeroDocumento}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.numeroDocumento && errors.numeroDocumento ? (
                <div className="error-message">{errors.numeroDocumento}</div>
              ) : null}

              <label htmlFor="telefono">Celular: </label>
              <div className="register__container__content--form--celular">
                <span className="telefono__code">+51</span>
                <input
                  name="telefono"
                  className="input"
                  type="text"
                  placeholder="Ingresa tu número celular"
                  value={values.telefono}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              <label htmlFor="email">Correo Electrónico: </label>
              <input
                name="email"
                className="input"
                type="email"
                placeholder="Ingrese su email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.email && errors.email ? (
                <div className="error-message">{errors.email}</div>
              ) : null}
              <label htmlFor="password">Contraseña: </label>
              <input
                name="password"
                className="input"
                type="password"
                placeholder="Password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.password && errors.password ? (
                <div className="error-message">{errors.password}</div>
              ) : null}

              <button className="button" type="submit">
                Registrarme
              </button>
              <div className="register__container__content--form--login">
                <p>
                  ¿No tienes una cuenta?
                  <Link className="link" to="/login">
                    Inicia sesión
                  </Link>
                </p>
              </div>
            </form>
          </div>

          <div className="register__container__content--details">
            <h3>Beneficios Importaciones Dominguez.com</h3>

            <div className="register__container__content--details--benefits">
              <div className="register__container__content--details--benefits--item">
                <NotificationIcon />
                <span>
                  Recibir notificaciones en tiempo real de tus pedidos
                </span>
              </div>
              <div className="register__container__content--details--benefits--item">
                <StickyNoteIcon />
                <span>Recibe tus boletas online</span>
              </div>
              <div className="register__container__content--details--benefits--item">
                <StarIcon />
                <span>Guarda tus medios de pagos y direcciones de envío</span>
              </div>
              <div className="register__container__content--details--benefits--item">
                <GiftIcon />
                <span>Promociones especiales, cupones de descuento y más.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
