import { Link } from "react-router-dom";
import "../assets/styles/main.scss";
import {
  AndroidIcon,
  FacebookIcon,
  InstagramIcon,
  TiktokIcon,
  TwitterIcon,
  YoutubeIcon,
} from ".";

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <div className="footer-block">
            <h5>Por qué comprar</h5>
            <ul className="footer-list footer-list--why-by">
              <li className="footer-list-item">
                <Link to="/">Como comprar</Link>
              </li>
              <li className="footer-list-item">
                <Link to="/">Formas de pago</Link>
              </li>
              <li className="footer-list-item">
                <Link to="/">Gastos de envío</Link>
              </li>
              <li className="footer-list-item">
                <Link to="/">Preguntas frecuentes</Link>
              </li>
            </ul>
          </div>

          <div className="footer-block">
            <h5>Quiénes somos</h5>
            <ul className="footer-list footer-list--about">
              <li className="footer-list-item">
                <Link to="/">Quiénes somos</Link>
              </li>
              <li className="footer-list-item">
                <Link to="/">Nuestras tiendas</Link>
              </li>
              <li className="footer-list-item">
                <Link to="/">Nuestras marcas</Link>
              </li>
              <li className="footer-list-item">
                <Link to="/">Aviso legal</Link>
              </li>
              <li className="footer-list-item">
                <Link to="/">Privacidad</Link>
              </li>
            </ul>
          </div>

          <div className="footer-block">
            <h5>Contactar</h5>
            <ul className="footer-list footer-list--contact">
              <li className="footer-list-item">
                <Link to="/">Centro de soporte</Link>
              </li>
              <li className="footer-list-item">
                <Link to="/">Contacto</Link>
              </li>
              <li className="footer-list-item">
                <Link to="/">Política de Cookies</Link>
              </li>
            </ul>
          </div>

          <div className="footer-block">
            <h5>Comunidad</h5>
            <ul className="footer-list footer-list--social">
              <li className="footer-list-item">
                <InstagramIcon />
                <Link to="/">Instagram</Link>
              </li>
              <li className="footer-list-item">
                <FacebookIcon />
                <Link to="/">Facebook</Link>
              </li>
              <li className="footer-list-item">
                <TiktokIcon />
                <Link to="/">Tiktok</Link>
              </li>
              <li className="footer-list-item">
                <YoutubeIcon />
                <Link to="/">Youtube</Link>
              </li>
              <li className="footer-list-item">
                <TwitterIcon />
                <Link to="/">Twitter</Link>
              </li>
            </ul>
          </div>

          {/* <div className="footer-block">
            <h5>Importaciones Domingues en </h5>
            <ul className="footer-list footer-list--map">
              <li className="footer-list-item">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3892.3916029137613!2d-73.73924915985175!3d-12.687844155732366!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x910d475388854b45%3A0x375cc4bb8c155516!2sDominguez%20Import!5e0!3m2!1ses-419!2spe!4v1706583429667!5m2!1ses-419!2spe"
                  width="600"
                  height="250"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </li>
              <h5>Descarga nuestra aplicación</h5>
              <li className="footer-list-item">
                <AndroidIcon />
                <span>Descarga nuestra aplicación</span>
              </li>
            </ul>
          </div> */}
        </div>

        <div className="footer-legal">
          <p>© TODOS LOS DERECHOS RESERVADOS</p>
          <p>Importaciones Dominguez S.A.C - RUC: 20546989621</p>
          <p>Ayacucho - Perú</p>
        </div>
      </div>
    </footer>
  );
};
