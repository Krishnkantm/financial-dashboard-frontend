import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "../pages/Login.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import Records from "../pages/Records.jsx";
import Users from "../pages/Users.jsx";

import MainLayout from "../layouts/MainLayout.jsx";
import ProtectedRoute from "../components/ProtectedRoute.jsx";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={
            <Navigate to="/login" />
          }
        />

        <Route
          path="/login"
          element={<Login />}
        />

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
               <ProtectedRoute
                 allowedRoles={["admin", "analyst"]}
               >
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
              <ProtectedRoute
                allowedRoles={["admin"]}
              >
                <Users />
              </ProtectedRoute>
            }
          />
        </Route>

      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;