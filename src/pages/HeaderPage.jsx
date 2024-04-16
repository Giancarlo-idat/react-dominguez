import { Link } from "react-router-dom";
import LogoDominguez from "../assets/images/logo_dominguez.png";

export const HeaderPage = () => {
  return (
    <div className="header">
      <div className="header-container page">
        <div className="header__logo--page ">
          <Link to={"/"} title="Ir a la página principal">
            <img
              src={LogoDominguez}
              loading="lazy"
              alt="Logo Importaciones Dominguez"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};
