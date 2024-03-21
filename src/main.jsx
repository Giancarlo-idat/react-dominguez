import ReactDOM from "react-dom/client";
import { AppRoute } from "./routes/AppRoute";
import { CartProvider, AuthProvider } from "./context";

ReactDOM.createRoot(document.getElementById("root")).render(
 <AuthProvider>
   <CartProvider>
    <AppRoute />
  </CartProvider>
 </AuthProvider>
);
