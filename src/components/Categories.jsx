import { Link } from "react-router-dom";
import { MdOutlineExpandMoreIcon, MenuIcon } from ".";

export const Categories = () => {
  return (
    <div className="categories">
      <div className="categories-container">
        <nav className="categories-nav">
          <ul className="categories-nav__list">
            <li className="categories-nav__item">
              <div className="all-categories flex border">
                <MenuIcon />
                <span>Toda las Categorias</span>
                <MdOutlineExpandMoreIcon />
              </div>
            </li>
            <li className="categories-nav__item">
              <Link to="/">Lo más nuevo con 50%</Link>
            </li>
            <li className="categories-nav__item">Nuevo</li>
            <li className="categories-nav__item">Super Computadoras</li>
            <li className="categories-nav__item">
              <div className="categories-more flex">
                <span>Más</span>
                <MdOutlineExpandMoreIcon />
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};
