import { DashboardRoute, AppRoute } from "@/routes";
import { Route, Routes, BrowserRouter } from "react-router-dom";

export const MainRoute = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard/*" element={<DashboardRoute />} />
        <Route path="/*" element={<AppRoute />} />
      </Routes>
    </BrowserRouter>
  );
};
