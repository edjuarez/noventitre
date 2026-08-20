import './App.css';
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import HomeScreen from "./pages/HomeScreen";
import CollectionScreen from "./pages/CollectionScreen";
import ProductDetailScreen from "./pages/ProductDetailScreen";
//import LoginScreen from "./pages/LoginScreen";
import CheckoutScreen from "./pages/CheckoutScreen";
import SuccessScreen from "./pages/SuccessScreen";
import Navbar from './components/Navbar';
import AdminDashboard from './pages/AdminDashboard';
import CustomerDashboard from './pages/CustomerDashboard';
import AdminLayout from './components/admin/AdminLayout';
import Footer from './components/Footer';
import { CartProvider } from "./context/CartContext";
import CartDrawer from './components/CartDrawer';
import { TermsPage } from './pages/legal/Terms';
import { PrivacyPage } from './pages/legal/Privacy';
import { ReturnsScreen } from './pages/legal/Returns';
import AboutScreen from './pages/AboutScreen';
import ScrollToTop from './components/ScrollToTop';
import AuthPage from './components/AuthPage';

// Autenticación y Protección de Rutas
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';

const MainLayout = () => (
  <div className="min-h-screen bg-brand-crema text-black antialiased selection:bg-brand-rosa selection:text-white">
    <Navbar />
    <main>
      <Outlet />
      <Footer />
      <CartDrawer />
    </main>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            {/* 1. RUTAS PÚBLICAS CON LAYOUT PRINCIPAL */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/catalogo" element={<CollectionScreen />} />
              <Route path="/acerca-de" element={<AboutScreen />} />
              <Route path="/product/:slug" element={<ProductDetailScreen />} />

              {/* Rutas Legales */}
              <Route path="/terminos-y-condiciones" element={<TermsPage />} />
              <Route path="/politica-privacidad" element={<PrivacyPage />} />
              <Route path="/politica-devoluciones" element={<ReturnsScreen />} />
            <Route element={<ProtectedRoute redirectTo="/login" />}>
              <Route path="/cuenta" element={<CustomerDashboard />} />
            </Route>
            </Route>

            {/* 2. RUTA DE LOGIN UNIFICADA (Pantalla dedicada sin Navbar/Footer) */}
            <Route path="/login" element={<AuthPage />} />

            {/* 3. RUTAS DE ADMINISTRACIÓN PROTEGIDAS (Requieren role === 'admin') */}
            <Route element={<ProtectedRoute requireAdmin={true} redirectTo="/login" />}>
              <Route element={<AdminLayout />}>
                <Route path="/admin" element={<AdminDashboard />} />
              </Route>
            </Route>



            {/* 4. STRIPE CHECKOUT Y ÉXITO */}
            <Route path="/checkout" element={<CheckoutScreen />} />
            <Route path="/success" element={<SuccessScreen />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;