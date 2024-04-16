import { Routes, Route, Navigate } from "react-router-dom";
import { ColorModeContext, useMode } from "@/pages";
import { useAuth } from "@/context";
import { ThemeProvider, CssBaseline } from "@mui/material";
import {
  Dashboard,
  Team,
  DocVentas,
  Form,
  Bar,
  Pie,
  Line,
  Client,
  Geography,
  Sidebar,
  Topbar,
  RegisterClient,
  Rol,
  RegisterEmployee,
  CreateCategorias,
  CreateProducts,
  Categorias,
  Products,
  Proveedor,
  RegisterProveedor,
  CreateRol,
} from "../pages/dashboard";
import { LoginDashboardPage } from "../pages";
import "../pages/dashboard/dashboard.scss";

export const DashboardRoute = ({ isSidebar, setIsSidebar }) => {
  const [theme, colorMode] = useMode();
  const { auth } = useAuth();

  const { status } = auth;

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              {status === "not-authenticated" ? (
                <>
                  <Route path="/" element={<LoginDashboardPage />} />
                  <Route path="/*" element={<Navigate to="/auth/login" />} />
                </>
              ) : (
                <>
                  {/*   {auth?.user?.roles === "ROLE_Administrador" ? (
                    <Route path="/" element={<Dashboard />} />
                  ) : (
                    <Route path="/*" element={<Navigate to="/home" />} />
                  )} */}
                  <Route path="/" element={<Dashboard />} />
                  <Route
                    path="/auth/registerClient"
                    element={<RegisterClient />}
                  />
                  <Route
                    path="/auth/registerEmployee"
                    element={<RegisterEmployee />}
                  />
                  <Route
                    path="/auth/registerProveedor"
                    element={<RegisterProveedor />}
                  />

                  <Route
                    path="/auth/addCategoria"
                    element={<CreateCategorias />}
                  />
                  <Route path="/auth/addProduct" element={<CreateProducts />} />
                  <Route path="/auth/addRol" element={<CreateRol />} />

                  <Route path="/team" element={<Team />} />
                  <Route path="/client" element={<Client />} />
                  <Route path="/roles" element={<Rol />} />
                  <Route path="/categories" element={<Categorias />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/proveedor" element={<Proveedor />} />
                  <Route path="/ventas" element={<DocVentas />} />
                  <Route path="/form" element={<Form />} />
                  <Route path="/bar" element={<Bar />} />
                  <Route path="/pie" element={<Pie />} />
                  <Route path="/line" element={<Line />} />
                  <Route path="/geography" element={<Geography />} />
                </>
              )}
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};
