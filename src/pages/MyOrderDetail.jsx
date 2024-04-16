import { Header, Footer } from "@/components";
import { usePaymentContext } from "@/context";
import { Link } from "react-router-dom";

export const MyOrderDetail = () => {
  const { orders, orderDetails, loading } = usePaymentContext();

  console.log(orders);

  return (
    <>
      <Header />
      <div className="myorders">
        <div className="myorders-container">
          <div className="myorders__title">
            <h4> Mis compras</h4>
          </div>

          {loading ? (
            <p>Cargando</p>
          ) : (
            <div className="myorders-content">
              {orders.map((order) => (
                <div key={order.id} className="myorders__item">
                  <div className="myorders__item-header">
                    <p>
                      Fecha de compra:
                      {new Date(order.fechaCreacion).toLocaleDateString()}
                    </p>
                    <p> {order.numComprobante}</p>
                  </div>

                  <div className="myorders__item--detail">
                    <div className="content-order">
                      {order.detallesVenta.map((detalleVenta, index) => (
                        <div className="detalle-venta" key={index}>
                          <img
                            src={detalleVenta.productos.imagen}
                            alt={detalleVenta.productos.modelo}
                          />
                          <p>{detalleVenta.productos.modelo}</p>
                        </div>
                      ))}
                    </div>

                    <div className="btn-detail">
                      <Link to="/myaccount/myorders/detail">Ver boleta</Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Seguimiento de pedido */}

          {loading ? (
            <p>Cargando</p>
          ) : (
            <>
              {orders.map((order) => (
                <div className="tracing" key={order.id}>
                  <div className="tracing__content">
                    <h4> Seguimiento del pedido</h4>
                    {/* Aqui iría el seguimiento */}
                    <div className="timeline">
                      <div className="timeline-item">
                        <div className={`status ${order.estadoEnvio}`}></div>
                        <p>{order.estadoEnvio}</p>
                      </div>
                    </div>
                  </div>

                  <div className="tracing__address">
                    <h4>Envío a domicilio </h4>
                    <p>Direccion: {order.cliente.direccion} </p>
                    <p>Horario: 8 a 20hrs</p>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};
