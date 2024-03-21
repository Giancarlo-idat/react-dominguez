import { useAuth, useCart } from "../context";
import { Link } from "react-router-dom";
import { LoginPage } from "@/pages";
import {
  CartIcon,
  Categories,
  FaChevronDownIcon,
  FavoriteIcon,
  SearchIcon,
} from ".";
import LogoDominguez from "../assets/images/logo_dominguez.png";
import { useState } from "react";

export const Header = () => {
  const { cart } = useCart();
  const { status, onLogout, user } = useAuth();
  const totalQuantity = cart.reduce(
    (total, product) => total + product.stock,
    0
  );
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    document.body.style.overflow = "hidden";
    setShowModal(true);
  };

  const onLogoutAccount = () => {
    onLogout();
  };

  const emailUser = user?.email;
  const closeModal = () => setShowModal(false);

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

        <SearchBar />

        <nav className="header__icon">
          <ul className="header__icon-container">
            {status === "not-authenticated" ? (
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
            ) : (
              <li className="header__icon-container--item">
                <div className="column">
                  <span>Bievenido</span>
                  <span>{emailUser}</span>
                </div>
                <ul className="dropdown">
                  <li className="dropdown-item">
                    <Link to={"/profile"}>Perfil</Link>
                  </li>
                  <li className="dropdown-item">
                    <Link to={"/orders"}>Ordenes</Link>
                  </li>
                  <li className="dropdown-item">
                    <Link onClick={onLogoutAccount}>Cerrar sesión</Link>
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
          </ul>
        </nav>

        {showModal && <LoginPage closeModal={closeModal} />}
      </div>
      <Categories />
    </header>
  );
};

const SearchBar = () => {
  return (
    <>
      <form className="searchbar-form">
        <input type="text" placeholder="Buscar producto..." />
        <button type="submit">
          <SearchIcon />
        </button>
      </form>
    </>
  );
};
