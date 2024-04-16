import { Header, Footer } from "@/components";
import { usePaymentContext } from "@/context";
import { Link } from "react-router-dom";

export const MyOrders = () => {
  const { orders, loading } = usePaymentContext();

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
                    <p>Fecha de compra: {new Date(order.fechaCreacion).toLocaleDateString()}</p>
                    <p>S/. {order.precioTotal}</p>
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
                    <p> {order.estadoEnvio}</p>

                    <div className="btn-detail">
                      <Link to="/myaccount/myorders/detail">Ver detalles</Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};
