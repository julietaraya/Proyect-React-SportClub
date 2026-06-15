import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Registro from "../pages/Registro";

import UserDashboard from "../pages/user/UserDashboard";
import CoachDashboard from "../pages/coach/CoachDashboard";
import AdminDashboard from "../pages/admin/AdminDashboard";
import UsersPage from "../pages/admin/UsersPage";

import ProtectedRoute from "./ProtectedRoute";
import RoleRoute from "./RoleRoute";
import Unauthorized from "../pages/Unauthorized";

import SportsPage from "../pages/admin/SportsPage"; 


function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registro />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Dashboards protegidos */}
        <Route
          path="/user/dashboard"
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/coach/dashboard"
          element={
            <ProtectedRoute>
              <CoachDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <RoleRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </RoleRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <RoleRoute allowedRoles={["admin"]}>
              <UsersPage />
            </RoleRoute>
          }
        />

        <Route
          path="/admin/sports"
          element={
            <RoleRoute allowedRoles={["admin"]}>
              <SportsPage />
            </RoleRoute>
          }
        />

        {/* Ruta por defecto */}
        <Route path="*" element={<Unauthorized />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
