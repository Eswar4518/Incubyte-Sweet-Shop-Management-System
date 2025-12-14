
import { Routes, Route } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Layout/Navbar";
import LoginForm from "./components/auth/LoginForm";
import RegisterForm from "./components/auth/RegisterForm";
import HomePage from "./components/pages/HomePage.clean";
import DashboardPage from "./components/pages/DashboardPage.clean";
import AdminPage from "./components/pages/AdminPage.clean";
import CartPage from "./components/Cart/CartPage";
import CheckoutPage from "./components/Cart/CheckoutPage";
import OrderConfirmationPage from "./components/pages/OrderConfirmationPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import NotFoundPage from "./components/pages/NotFoundPage.clean";
import TestAuth from "./components/TestAuth";
import Chatbot from "./components/Chatbot/Chatbot";

function App() {
  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <CartProvider>
      <div className="min-h-screen" style={{background: 'linear-gradient(135deg, rgba(254, 243, 199, 0.8) 0%, rgba(254, 215, 170, 0.8) 25%, rgba(254, 202, 202, 0.8) 50%, rgba(243, 232, 255, 0.8) 75%, rgba(224, 231, 255, 0.8) 100%), url("https://picsum.photos/1920/1080?random=999") center/cover no-repeat', backgroundAttachment: 'fixed'}}>
        <Navbar />
        <main className="container mx-auto px-4 py-8 pt-20 bg-transparent">
          <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/test" element={<TestAuth />} />
          <Route path="/" element={<HomePage />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <CartPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <CheckoutPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/order-confirmation"
            element={
              <ProtectedRoute>
                <OrderConfirmationPage />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Chatbot />
      </div>
    </CartProvider>
  );
}

export default App;
