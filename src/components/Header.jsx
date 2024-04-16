import { useState } from "react";
import { Link } from "react-router-dom";
import {
  useAuth,
  useCart,
  useClientContext,
  useEmployeeContext,
  useModalContext,
} from "@/context";
import { LoginPage } from "@/pages";
import {
  CartIcon,
  CloseIcon,
  FaChevronDownIcon,
  FavoriteIcon,
  SearchIcon,
} from ".";
import LogoDominguez from "../assets/images/logo_dominguez.png";

export const Header = () => {
  const { cart, totalQuantity, limpiarCarrito } = useCart();
  const { onLogout, auth } = useAuth();
  const { clientProfile } = useClientContext();
  const { employeeProfile } = useEmployeeContext();
  const { openModal, closeModal, isModalOpen } = useModalContext();

  const [showSearchBar, setShowSearchBar] = useState(false);

  const openSearchBar = () => {
    setShowSearchBar(true);
  };

  const onLogoutAccount = () => {
    onLogout();
    limpiarCarrito();
  };


  const closeSearchBar = () => setShowSearchBar(false);

  const clientFullName = [clientProfile?.nombres].filter(Boolean).join(" ");
  const employeeFullName = [employeeProfile?.nombres].filter(Boolean).join(" ");

  const namesProfileHeader = clientFullName || employeeFullName;

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__logo">
          <Link to={"/"} title="Ir a la página principal">
            <img
              src={LogoDominguez}
              loading="lazy"
              alt="Logo Importaciones Dominguez"
            />
          </Link>
        </div>
        <nav className="header__icon">
          <ul className="header__icon-container">
            {auth?.status === "authenticated" ? (
              <li className="header__icon-container--item">
                <div className="column">
                  <span>Hola, {namesProfileHeader}</span>
                </div>
                <ul className="dropdown">
                  <li className="dropdown-item">
                    <Link to={"/profile"}>Perfil</Link>
                  </li>
                  <li className="dropdown-item">
                    <Link to={"/myaccount/myorders"}>Ordenes</Link>
                  </li>
                  <li>
                    <Link to={"/dashboard"}>Dashboard</Link>
                  </li>
                  <li className="dropdown-item">
                    <Link onClick={onLogoutAccount}>Cerrar sesión</Link>
                  </li>
                </ul>
              </li>
            ) : (
              <li className="header__icon-container--item">
                Inicia sesión
                <FaChevronDownIcon />
                <ul className="dropdown">
                  <li className="dropdown-item">
                    <button onClick={openModal}>Iniciar sesión</button>
                  </li>

                  <li className="dropdown-item">
                    <Link to={"/myaccount/register"}>Registrate</Link>
                  </li>
                </ul>
              </li>
            )}

            <li className="header__icon-container--item">
              <Link to={"/favoritos"} title="Favoritos">
                <FavoriteIcon />
                <div className="badge">3</div>
              </Link>
            </li>

            <li className="header__icon-container--item">
              <Link to={"/myproducts/cart"} title="Ir Carrito de compras">
                <CartIcon />
                <div className="badge">{totalQuantity}</div>
              </Link>
            </li>

            <li className="header__icon-container--item">
              <Link onClick={openSearchBar} title="Buscar productos">
                <SearchIcon />
              </Link>
            </li>
          </ul>
        </nav>
        {isModalOpen && <LoginPage closeModal={closeModal} />}
        {showSearchBar && <SearchBar closeSearchBar={closeSearchBar} />}
      </div>
    </header>
  );
};

const SearchBar = ({ closeSearchBar }) => {
  const handleSubmit = (event) => {
    event.preventDefault(); // Evita que el formulario se envíe
    // Aquí puedes realizar acciones adicionales si es necesario
  };

  return (
    <>
      <form className="searchbar-form" onSubmit={handleSubmit}>
        <button onClick={closeSearchBar} className="close-searchbar">
          <CloseIcon />
        </button>
        <input type="text" placeholder="Buscar producto..." />
        <button type="submit">
          <SearchIcon />
        </button>
      </form>
    </>
  );
};
