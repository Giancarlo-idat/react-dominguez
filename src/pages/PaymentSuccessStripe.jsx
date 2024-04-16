import { Link } from "react-router-dom";
import { usePaymentContext } from "../context";
import { HeaderPage } from "../pages";
import PaymentSuccess from "../assets/images/icon_success.png";

export const PaymentSuccessStripe = () => {
  const { orders, loading } = usePaymentContext();

  return (
    <>
      <HeaderPage />
      <div className="payment-success">
        <div className="payment-success__container">
          <div className="payment-success__title">
            <img src={PaymentSuccess} loading="lazy" alt="Pago exitoso" />
            <h4>¡Pago exitoso!</h4>
          </div>

          <div className="payment-success__order">
            {loading ? (
              <p>Cargando...</p>
            ) : (
              orders.map((order) => (
                <div className="payment-success__order--detail" key={order.id}>
                  <div className="docPay">
                    <span>Orden:</span>
                    <h3>{order.id}</h3>
                  </div>
                  <div className="docPay">
                    <span>N° Comprobante:</span>
                    <h5>{order.numComprobante}</h5>
                  </div>
                  <div className="docPay">
                    <span>Tipo de Transacción:</span>
                    <p>{order.tipoTransaccion.nombre}</p>
                  </div>
                  <div className="docPay">
                    <span>Fecha de compra:</span>
                    <p>{new Date(order.fechaCreacion).toLocaleDateString()}</p>
                  </div>
                  <div className="docPay">
                    <span>Fecha de entrega:</span>
                    <p>{new Date(order.fechaEntrega).toLocaleDateString()}</p>
                  </div>
                  <div className="docPay">
                    <span>Estado de pedido:</span>
                    <p>{order.estadoEnvio.toUpperCase()}</p>
                  </div>
                  <div className="docPay">
                    <span>Total:</span>
                    <p>S/. {order.precioTotal}</p>
                  </div>
                </div>
              ))
            )}

            <div className="payment-success__button">
              <div className="btn-home">
                <Link to={"/home"}>Volver</Link>
              </div>
              <div className="btn-orders">
                <Link to={"/myaccount/myorders"}>Ver mis pedidos</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
