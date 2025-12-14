/**
 * Navigation Bar Component
 *
 * Displays:
 * - Logo and brand name
 * - Navigation links (Home, Dashboard)
 * - Admin link (if admin user)
 * - Login/Logout buttons
 */

import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import CartIcon from "../Cart/CartIcon";

const Navbar: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [isDark, setIsDark] = useState(() => {
    return (
      localStorage.getItem("theme") === "dark" ||
      document.documentElement.classList.contains("dark")
    );
  });
  const navigate = useNavigate();
  const location = useLocation();

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    document.documentElement.classList.toggle("dark", newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };
  const navBgClass = isDark
    ? "bg-yellow-100 text-amber-900"
    : "bg-amber-900 text-white";
  return (
    <nav className={`${navBgClass}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold hover:text-yellow-600 transition-colors duration-200"
          >
            🍭 Sweet Shop
          </Link>

          {/* Navigation Links */}
          <div className="flex gap-6">
            <Link
              to="/"
              className={`hover:text-blue-200 transition-all duration-300 px-3 py-1 rounded ${
                location.pathname === "/"
                  ? "text-yellow-400 font-bold bg-black bg-opacity-20"
                  : ""
              }`}
            >
              Home
            </Link>

            {/* Admin Link - Only show for admins */}
            {isAuthenticated && user?.role === "admin" && (
              <Link
                to="/admin"
                className={`hover:text-blue-200 transition-all duration-300 px-3 py-1 rounded ${
                  location.pathname === "/admin"
                    ? "text-yellow-400 font-bold bg-black bg-opacity-20"
                    : ""
                }`}
              >
                Admin Panel
              </Link>
            )}
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-4">
            {isAuthenticated && <CartIcon />}
            {isAuthenticated ? (
              <>
                <div className="flex items-center gap-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      user?.role === "admin"
                        ? "bg-yellow-400 text-yellow-900"
                        : "bg-green-400 text-green-900"
                    }`}
                  >
                    {user?.role === "admin" ? "👑 Admin" : "👤 Customer"}
                  </span>
                  <span className="font-medium dark:text-black">
                    {user?.username || user?.email}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  🚪 Logout
                </button>
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-lg bg-yellow-600 hover:bg-yellow-700 transition-colors"
                >
                  {isDark ? "☀️" : "🌙"}
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-white hover:text-yellow-300 font-semibold transition-colors duration-200"
                >
                  🔑 Login
                </Link>
                <Link
                  to="/register"
                  className="bg-white text-amber-800 hover:bg-yellow-100 px-6 py-2 rounded-lg font-bold transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  ✨ Register
                </Link>
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-lg bg-yellow-600 hover:bg-yellow-700 transition-colors"
                >
                  {isDark ? "☀️" : "🌙"}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
