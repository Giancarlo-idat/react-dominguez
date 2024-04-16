import { Fragment, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MapIcon, EraserIcon, DeliveryIcon, AlertIcon } from "@/components";
import {
  useCart,
  useDocVentaContext,
  useEmployeeContext,
  usePaymentContext,
  useAuth,
  useModalContext,
  useClientContext,
} from "@/context";
import { HeaderPage, LoginPage } from "@/pages";
import { BigDecimal } from "bigdecimal";
import SweetAlert from "sweetalert2";
import "../assets/styles/main.scss";

export const CheckoutDeliveryPage = () => {
  const [fechaEnvio, setFechaEnvio] = useState("");
  const [precioSeleccionado, setPrecioSeleccionado] = useState(null);
  const { cart, totalPrice } = useCart();
  const { agregarDocVenta } = useDocVentaContext();
  const { clientProfile } = useClientContext();
  const { employeeProfile } = useEmployeeContext();
  const { createPaymentLink } = usePaymentContext();
  const { openModal, closeModal, isModalOpen } = useModalContext();
  const { auth } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const precioEnvio = new BigDecimal("5.00");
  const subTotal = new BigDecimal(totalPrice);
  const precioTotal = new BigDecimal(totalPrice).add(precioEnvio);

  // Redondear el precio total a dos decimales
  const precioTotalRedondeado = precioTotal.setScale(
    2,
    BigDecimal.ROUND_HALF_UP
  );

  const subTotalRedondeado = subTotal.setScale(2, BigDecimal.ROUND_HALF_UP);

  useEffect(() => {
    if (
      location.pathname === "/checkout/delivery" &&
      auth.status === "not-authenticated" &&
      !isModalOpen
    ) {
      openModal();
    }
  }, []);

  const handleCloseModal = () => {
    closeModal();
    navigate("/home");
  };

  const obtenerProximasFechas = () => {
    const proximasFechasEntrega = [];
    const diasSemana = ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"];
    const fechaActual = new Date();
    let diaSiguiente = new Date(fechaActual); // copia de la fecha actual

    // Avanzar al día siguiente
    diaSiguiente.setDate(fechaActual.getDate() + 1);

    // Iteración para obtener las próximas 5 fechas
    for (let i = 0; i < 5; i++) {
      const dia = diasSemana[diaSiguiente.getDay()];
      const diaMes = diaSiguiente.getDate();
      const mes = diaSiguiente.getMonth() + 1;
      const fechaFormateada = `${dia} ${diaMes < 10 ? "0" + diaMes : diaMes}/${
        mes < 10 ? "0" + mes : mes
      }`;
      //proximasFechasEntrega.push(fechaFormateada);

      const año = diaSiguiente.getFullYear();
      const mesAño = (diaSiguiente.getMonth() + 1).toString().padStart(2, "0");
      const dias = diaSiguiente.getDate().toString().padStart(2, "0");

      const fechaFormateadas = `${año}-${mesAño}-${dias}`;
      proximasFechasEntrega.push(fechaFormateadas);
      // Avanzar al día siguiente para la siguiente iteración
      diaSiguiente.setDate(diaSiguiente.getDate() + 1);
    }

    return proximasFechasEntrega;
  };

  const handleSeleccionarPrecio = (index) => {
    // Función para manejar la selección de precio y actualizar la fecha de envío
    setPrecioSeleccionado(index);
    const fechaSeleccionada = proximasFechas[index].trim(); // Obtener la fecha seleccionada
    //const [diaSemana, diaMes, mes] = fechaSeleccionada.split(" ").slice(0, 3); // Separar la fecha en partes

    // Formatear la fecha para enviar al backend en el formato deseado "Mar 02/04"
    //const fechaFormateada = `${diaSemana} ${diaMes}/${mes}`;

    setFechaEnvio(fechaSeleccionada); // Actualizar la fecha de envío
  };

  const handlePayment = async () => {
    try {
      const precioTotal = Number(precioTotalRedondeado);

      // Llamar a la función createPaymentLink con el precioTotal como argumento
      const paymentLink = await createPaymentLink(precioTotal);

      window.location.href = paymentLink.payment_url; // Redirige al usuario al enlace de pago generado
      return { success: true };
    } catch (error) {
      console.log("Error creating payment link:", error.message);
      return { success: false, error: error.message }; // Devuelve un objeto indicando que el pago falló y proporciona el mensaje de error
    }
  };

  const handleConfirmarCompra = async () => {
    if (
      employeeProfile?.direccion === null ||
      clientProfile?.direccion === null ||
      fechaEnvio === null
    ) {
      SweetAlert.fire({
        icon: "error",
        title: "Error",
        text: "Debes ingresar una dirección de envío",
      });
      return;
    }

    try {
      // Intentar realizar el pago
      const paymentResult = await handlePayment();

      // Verificar si el pago se realizó con éxito
      if (paymentResult && paymentResult.success) {
        // Si el pago se realiza con éxito, crear el documento de venta
        const [dia, mes, año] = fechaEnvio.split("/");
        const fechaEnvioFormatted = `${año}-${mes}-${dia}`;

        const clienteData = clientProfile
          ? {
              ...clientProfile,
              ...(clientProfile.tipoDocumento && {
                tipoDocumento: Object.fromEntries(
                  Object.entries(clientProfile.tipoDocumento)
                ),
              }),
            }
          : null;

        const empleadoData = employeeProfile
          ? {
              ...employeeProfile,
              ...(employeeProfile.tipoDocumento && {
                tipoDocumento: Object.fromEntries(
                  Object.entries(employeeProfile.tipoDocumento)
                ),
              }),
              ...(employeeProfile.rol && {
                rol: Object.fromEntries(Object.entries(employeeProfile.rol)),
              }),
            }
          : null;

        const documentoVenta = {
          cliente: empleadoData || clienteData,
          tipoTransaccion: {
            id: "TTR-VENTA-TOC201",
            nombre: "Boleta",
          },
          direccionEnvio:
            employeeProfile?.direccion || clientProfile?.direccion,
          fechaEntrega: fechaEnvio,
          detallesVenta: cart.map((product) => ({
            productos: {
              id: product.id,
              modelo: product.modelo,
              descripcion: product.descripcion,
              marca: product.marca,
              precio: product.precio,
              stock: product.stock,
              imagen: product.imagen,
              categoria: {
                id: product.categoria.id,
                nombre: product.categoria.nombre,
                descripcion: product.categoria.descripcion,
                imagen: product.categoria.imagen,
              },
              fichaTecnica: product.fichaTecnica,
            },
            cantidad: product.cantidad,
            precioUnitario: product.precio,
            precioTotal: totalPrice,
          })),
        };

        // Esperar a que se resuelva la promesa de agregarDocVenta
        await agregarDocVenta(documentoVenta);

        // Notificar al usuario que la compra se ha realizado con éxito
        SweetAlert.fire({
          icon: "success",
          title: "¡Compra exitosa!",
          text: "Tu compra ha sido procesada con éxito.",
        });
      } else {
        // Si hay un error en el pago, mostrar un mensaje de error
        SweetAlert.fire({
          icon: "error",
          title: "Error",
          text: "Hubo un error al procesar tu pago. Por favor, inténtalo nuevamente.",
        });
      }
    } catch (error) {
      console.error("Error al realizar el pago:", error.message);
      SweetAlert.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un error al procesar tu pago. Por favor, inténtalo nuevamente.",
      });
    }
  };

  const proximasFechas = obtenerProximasFechas();
  const getMounth = new Date();
  const nombreMes = getMounth.toLocaleString("es-ES", { month: "long" });
  const mes = nombreMes.charAt(0).toUpperCase() + nombreMes.slice(1, 3);

  return (
    <>
      <HeaderPage />
      <div className="delivery-checkout">
        <div className="delivery-checkout--container">
          <div className="delivery-checkout--container--delivery">
            <div className="delivery-checkout--container--delivery__address">
              <span className="address">
                <MapIcon />
                Dirección:
                {employeeProfile?.direccion ||
                  clientProfile?.direccion ||
                  " Sin dirección actualizada"}
              </span>
              <div className="change-direction">
                <span>
                  <EraserIcon />
                </span>
                <p>Cambiar</p>
                <span>
                  <AlertIcon size={15} />
                </span>
              </div>
            </div>
            <div className="delivery-checkout--container--delivery__dates">
              <div className="items">
                <h3>Carrito: ({cart.length} productos)</h3>
                <div className="products">
                  {cart?.map((product) => (
                    <Fragment key={product.id}>
                      <img
                        src={product.imagen}
                        alt={product.modelo}
                        loading="lazy"
                      />
                    </Fragment>
                  ))}
                </div>
                <strong>Tipo de entrega</strong>
                <div className="date">
                  <div className="date__icon">
                    <DeliveryIcon />
                    <span> Envío a domicilio: </span>
                  </div>
                  <span>
                    Llega el <strong>{fechaEnvio}</strong> de 8 a 20h.
                  </span>
                  <p>¿En qué fecha quieres recibir tu despacho?</p>
                  <h6>{mes}</h6>
                  <div className="date__options">
                    <div className="option">
                      <span>Todo el día</span>
                      <strong>8 a 20h</strong>
                    </div>
                    <div className="contenedor">
                      {proximasFechas.map((fecha, index) => (
                        <div className="date-price " key={index}>
                          <div className="arriba">
                            <span className="dia">{fecha}</span>
                          </div>
                          <button
                            key={index}
                            className={`abajo price ${
                              index === precioSeleccionado ? "seleccionado" : ""
                            }`}
                            onClick={() => handleSeleccionarPrecio(index)}
                          >
                            S/. {precioEnvio.toString()}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="delivery-checkout--container--details">
            <div className="delivery-checkout--container--details__title">
              <h4>Resumen de la compra</h4>
            </div>

            <div className="delivery-checkout--container--details__items">
              <p className="size_products">({cart?.length} productos)</p>
              {cart.map((product) => (
                <div className="items" key={product.id}>
                  <div className="items__image">
                    <img
                      src={product.imagen}
                      alt={product.modelo}
                      loading="lazy"
                    />
                  </div>
                  <div className="items__description">
                    <p>{product.marca}</p>
                    <p>{product.modelo}</p>
                    <p>Cantidad: {product.cantidad}</p>
                  </div>
                  <div className="items__price">
                    <p>S/ {product.precio}</p>
                  </div>
                </div>
              ))}

              <div className="shopping_cart">
                <Link to="/myproducts/cart">
                  <button className="shopping_cart--button">
                    Volver al carro
                  </button>
                </Link>
              </div>

              <div className="delivery-checkout--container--details__total">
                <div className="shipping">
                  <p>Costo de envío:</p>
                  <p>S/. {precioEnvio.toString()}</p>
                </div>

                <div className="subtotal">
                  <p>Subtotal:</p>
                  <p>S/ {subTotalRedondeado.toString()}</p>
                </div>

                <div className="total">
                  <p>Total:</p>
                  <p>S/ {precioTotalRedondeado.toString()}</p>
                </div>
              </div>

              <Link className="delivery-checkout--container--details__payment">
                <button
                  disabled={
                    employeeProfile?.direccion === null ||
                    clientProfile?.direccion === null ||
                    cart.length === 0 ||
                    precioSeleccionado === null ||
                    fechaEnvio === null
                  }
                  onClick={handleConfirmarCompra}
                  className="payment"
                >
                  Ir a Pagar
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && <LoginPage closeModal={handleCloseModal} />}
    </>
  );
};
