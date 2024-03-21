import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  HomePage,
  RegisterPage,
  CheckoutPage,
  ShoppingCartPage,
} from "@/pages";
import { Footer, Header } from "@/components";
import "@/assets/styles/main.scss";

export const AppRoute = () => {
  return (
    <div className="app">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
           <Route path="/myaccount/register" element={<RegisterPage />} />
          <Route path="/myproducts/cart" element={<ShoppingCartPage />} />
          <Route path="/checkout/delivery" element={<CheckoutPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};
