import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import Records from "../pages/Records.jsx";
import Users from "../pages/Users.jsx";

import MainLayout from "../layouts/MainLayout.jsx";
import ProtectedRoute from "../components/ProtectedRoute.jsx";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* Redirect Root */}
        <Route
          path="/"
          element={<Navigate to="/login" replace />}
        />

        {/* Public Routes */}
        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* Protected Routes */}
        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={["admin", "analyst"]}>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/records"
            element={<Records />}
          />

          <Route
            path="/users"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <Users />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* 404 Route */}
        <Route
          path="*"
          element={<h2 style={{ textAlign: "center", marginTop: "100px" }}>404 - Page Not Found</h2>}
        />

      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;