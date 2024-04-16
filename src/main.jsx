import ReactDOM from "react-dom/client";
import { MainRoute } from "./routes";
import {
  CartProvider,
  AuthProvider,
  TipoDocumentoProvider,
  PaymentProvider,
  ClientProvider,
  DocVentaProvider,
  EmployeeProvider,
  RolProvider,
  CategoriesProvider,
  ProductProvider,
  ProveedorProvider,
  ModalProvider,
  ReportsProvider,
} from "./context";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ModalProvider>
    <AuthProvider>
      <ReportsProvider>
        <PaymentProvider>
          <CartProvider>
            <CategoriesProvider>
              <ProductProvider>
                <RolProvider>
                  <TipoDocumentoProvider>
                    <ProveedorProvider>
                      <ClientProvider>
                        <EmployeeProvider>
                          <DocVentaProvider>
                            <MainRoute />
                          </DocVentaProvider>
                        </EmployeeProvider>
                      </ClientProvider>
                    </ProveedorProvider>
                  </TipoDocumentoProvider>
                </RolProvider>
              </ProductProvider>
            </CategoriesProvider>
          </CartProvider>
        </PaymentProvider>
      </ReportsProvider>
    </AuthProvider>
  </ModalProvider>
);
