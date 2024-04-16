import React, { createContext, useContext, useEffect, useState } from "react";
import dominguezApi from "@/api/dominguezApi";

// 1. Definir el contexto
const PaymentContext = createContext();

// 2. Crear un proveedor de contexto
export const PaymentProvider = ({ children }) => {
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [orderDetails, setOrderDetails] = useState(null);

  // Función para crear el enlace de pago y actualizar el estado
  const createPaymentLink = async (precio_total) => {
    try {
      setLoading(true);
      const { data } = await dominguezApi.post(
        "/stripe/payment/create",
        precio_total
      );
      return data;
    } catch (error) {
      console.log(error.message);
      setErrorMessage(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getMyOrders = async () => {
    try {
      setLoading(true);
      const { data } = await dominguezApi.get("/profile/myorders/client");
      setOrders(data);
    } catch (error) {
      console.log(error.message);
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getOrdersDetails = async () => {
    try {
      setLoading(true);
      const { data } = await dominguezApi.get(`/profile/myorders/details`);
      setOrderDetails(data);
    } catch (error) {
      console.log(error.message);
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };


  const getOrdersAndDetails = async (orderId = null) => {
    try {
      setLoading(true);
      const orderPromise = dominguezApi.get("/profile/myorders/client");
      const orderDetailsPromise = orderId
        ? dominguezApi.get(`/profile/order/${orderId}/details`)
        : null;

      const [orderResponse, orderDetailsResponse] = await Promise.all([
        orderPromise,
        orderDetailsPromise,
      ]);

      setOrders(orderResponse.data);
      if (orderDetailsResponse) {
        setOrderDetails(orderDetailsResponse.data);
      }
    } catch (error) {
      console.log(error.message);
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMyOrders();
  }, []);

  useEffect(() => {
    getOrdersDetails();
  }, []);

  return (
    <PaymentContext.Provider
      value={{
        createPaymentLink,
        errorMessage,
        loading,
        orders,
        orderDetails,
        getMyOrders,
        getOrdersDetails,
        getOrdersAndDetails,
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
};

// 3. Consumir el contexto
export const usePaymentContext = () => {
  const context = useContext(PaymentContext);
  if (!context)
    throw new Error("usePayment must be used within a PaymentProvider");

  return context;
};
