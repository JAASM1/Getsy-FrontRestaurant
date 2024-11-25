import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./Context/AuthProvider.tsx";
import MainLayout from "./Layouts/MainLayout.tsx";
import AuthLayout from "./Layouts/AuthLayout.tsx";
import Home from "./Pages/Home.tsx";
import Dashboard from "./Pages/DashBoard/Dashboard.tsx";
import Reseñas from "./Pages/DashBoard/Reseñas.tsx";
import Login from "./Pages/Auth/Login/Login.tsx";
import Register from "./Pages/Auth/Register.tsx";
import FormLoginMobile from "./Pages/Auth/FormLoginMobile.tsx";
import ChangePassword from "./Pages/Auth/ChangePassword.tsx";
import ResetPassword from "./Pages/Auth/ResetPassword.tsx";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) {
    return <div>Cargando...</div>;
  }
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) {
    return <div>Cargando...</div>;
  }
  return isAuthenticated ? <Navigate to="/" replace /> : <>{children}</>;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Rutas con AuthLayout - Publicas */}
          <Route element={<AuthLayout />}>
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              }
            />
            <Route
              path="/login-m"
              element={
                <PublicRoute>
                  <FormLoginMobile />
                </PublicRoute>
              }
            />
            <Route
              path="/change-password"
              element={
                <PublicRoute>
                  <ChangePassword />
                </PublicRoute>
              }
            />
            <Route
              path="/reset-password"
              element={
                <PublicRoute>
                  <ResetPassword />
                </PublicRoute>
              }
            />
          </Route>

          {/* Rutas con MainLayout - Protegidas */}
          <Route element={<MainLayout />}>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/reseñas"
              element={
                <ProtectedRoute>
                  <Reseñas />
                </ProtectedRoute>
              }
            />
            <Route
              path="/horarios"
              element={
                <ProtectedRoute>
                  <Reseñas />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
