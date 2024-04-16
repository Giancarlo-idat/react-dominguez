import { Link } from "react-router-dom";
import { CloseIcon, UserIcon } from "@/components";
import LogoDominguez from "@/assets/images/logo_dominguez.png";
import { useFormik } from "formik";
import { useAuth } from "../context";
import { EyeIcon, EyeSlashIcon } from "../components";
import { useState } from "react";

export const LoginPage = ({ closeModal }) => {
  const { onLogin } = useAuth();
  const [viewPassword, setViewPassword] = useState(false);

  const loginSubmit = (event) => {
    event.preventDefault();
    onLogin({ email: values.email, password: values.password });
    document.body.style.overflow = "auto";
    closeModal();
  };

  const handleViewPassword = () => {
    setViewPassword(!viewPassword);
  };

  const { handleChange, values } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: loginSubmit,
  });


  return (
    <section className="modal">
      <div className="modal__container">
        <div className="modal__close">
          <button className="modal__close--button" onClick={closeModal}>
            <CloseIcon />
          </button>
        </div>

        <figure className="modal__container--picture">
          <h2 className="modal__title">Bienvenido a</h2>
          <img
            src={LogoDominguez}
            loading="lazy"
            alt="Logo Importaciones Dominguez"
          />
          <UserIcon />
        </figure>

        <h3 className="modal__login">Inicia sesión</h3>

        <form className="modal__form" onSubmit={loginSubmit}>
          <input
            type="text"
            placeholder="Email"
            className="modal__form--input"
            name="email"
            value={values.email}
            onChange={handleChange}
          />
          <div className="modal__form--password" onClick={handleViewPassword}>
            {viewPassword ? (
              <>
                <input
                  type="password"
                  placeholder="Contraseña"
                  className="modal__form--input password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                />
                <EyeIcon className="eyes" />
              </>
            ) : (
              <>
                <input
                  type="text"
                  placeholder="Contraseña"
                  className="modal__form--input password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                />
                <EyeSlashIcon className="eyes" />
              </>
            )}
          </div>
          <Link
            to="/forgot-password"
            className="modal__form--link modal__form--link--forgot "
          >
            ¿Olvidaste tu contraseña?
          </Link>
          <button type="submit" className="modal__form--button">
            Iniciar sesión
          </button>
          <button className="modal__form--button">Google</button>
          <p>¿No tienes una cuenta?</p>
          <Link
            to="/myaccount/register"
            className="modal__form--link modal__form--link--register"
          >
            ¡Regístrate Aquí!
          </Link>
        </form>
      </div>
    </section>
  );
};
