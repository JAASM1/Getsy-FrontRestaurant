import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../Context/AuthProvider";
import Logo from "../Assets/Logo.jpeg";
import GIF from "../Assets/por-que.gif";

export default function NavBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState<boolean>(false);

  // Nuevo estado para el menú móvil
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <nav className="w-full bg-white font-Poppins mb-5 md:mb-7 shadow-md">
        <div className="flex py-2 px-5 items-center justify-between">
          {/* Logo */}
          <Link to={"/"}>
            <img src={Logo} alt="Logo" className="w-14" />
          </Link>

          {/* Menú Desktop */}
          <div className="hidden md:flex justify-end gap-12 font-semibold">
            <Link
              to={"/"}
              className={`${
                location.pathname === "/" ? "border-b-2 border-black" : ""
              }`}
            >
              Inicio
            </Link>
            <Link
              to={"/dashboard"}
              className={`${
                location.pathname.startsWith("/dashboard")
                  ? "border-b-2 border-black"
                  : ""
              }`}
            >
              Dashboard
            </Link>
            {/* Botón para hacer logout */}
            <button onClick={() => setShowLogoutModal(true)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
            </button>
          </div>

          {/* Botón de Menú Hamburguesa para Mobile */}
          <button
            className="md:hidden focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? (
              // Ícono de cerrar (X)
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              // Ícono de hamburguesa
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Menú Móvil */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white shadow-md">
            <Link
              to={"/"}
              className={`block px-4 py-2 ${
                location.pathname === "/" ? "bg-gray-200" : ""
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Inicio
            </Link>
            <Link
              to={"/dashboard"}
              className={`block px-4 py-2 ${
                location.pathname === "/dashboard" ? "bg-gray-200" : ""
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
            {/* Botón para hacer logout en menú móvil */}
            <button
              onClick={() => {
                setShowLogoutModal(true);
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left px-4 py-2"
            >
              Cerrar Sesión
            </button>
          </div>
        )}
      </nav>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 font-Poppins">
          <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-xl">
            <h2 className="text-xl font-bold mb-4">
              ¿Estás seguro que quieres cerrar sesión?
            </h2>
            <img src={GIF} alt="GIF" className="w-32 h-32" />
            <div className="flex justify-between w-full mt-4">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 bg-gray-200 rounded mr-2"
              >
                Cancelar
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
