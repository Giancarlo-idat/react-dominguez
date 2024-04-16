import { Route, Routes, Navigate } from "react-router-dom";
import {
  HomePage,
  RegisterPage,
  ShoppingCartPage,
  CheckoutDeliveryPage,
  PaymentSuccessStripe,
  PaymentCancelStripe,
  MyOrderDetail,
  MyOrders,
} from "@/pages";
import { ProductDetail } from "../pages";

export const AppRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/product/productDetail/:id" element={<ProductDetail />} />
      <Route path="/myaccount/myorders" element={<MyOrders />} />
      <Route path="/myaccount/myorders/detail" element={<MyOrderDetail />} />
      <Route path="/myaccount/register" element={<RegisterPage />} />
      <Route path="/myproducts/cart" element={<ShoppingCartPage />} />
      <Route path="/checkout/delivery" element={<CheckoutDeliveryPage />} />
      <Route path="/payment/success" element={<PaymentSuccessStripe />} />
      <Route path="/payment/cancel" element={<PaymentCancelStripe />} />
    </Routes>
  );
};
