import './App.css'
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import HomeScreen from "./pages/HomeScreen";
import CollectionScreen from "./pages/CollectionScreen";
import ProductDetailScreen from "./pages/ProductDetailScreen";
import LoginScreen from "./pages/LoginScreen";
import CheckoutScreen from "./pages/CheckoutScreen";
import SuccessScreen from "./pages/SuccessScreen";
import Navbar from './components/Navbar';
import AdminDashboard from './pages/AdminDashboard';
import AdminLayout from './components/admin/AdminLayout';
import Footer from './components/Footer';
import { CartProvider } from "./context/CartContext";
import CartDrawer from './components/CartDrawer';

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
  // const router = createBrowserRouter([
  //   {
  //     path: "/",
  //     element: <MainLayout />,
  //     children: [
  //       { path: "/", element: <HomeScreen /> },
  //       { path: "/catalogo", element: <CollectionScreen /> },
  //       { path: "/product/:slug", element: <ProductDetailScreen /> }
  //     ]
  //   },
  //   // Ruta de Login
  //   {
  //     path: "/login",
  //     element: <LoginScreen />
  //   },
  //   // Rutas de Administración Protegidas
  //   {
  //     path: "/admin",
  //     element: <AdminLayout />,
  //     children: [
  //       { path: "/admin", element: <AdminDashboard /> }
  //     ]
  //   },
  //   // Stripe Checkout
  //   {
  //     path: "/checkout",
  //     element: <CheckoutScreen />
  //   }
  // ]);

  return (
    <CartProvider>
      <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/catalogo" element={<CollectionScreen />} />
          <Route path="/product/:slug" element={<ProductDetailScreen />} />
        </Route>

        {/* 2. RUTA DE LOGIN (Pantalla limpia, sin Navbar) */}
        <Route path="/login" element={<LoginScreen />} />

        {/* 3. RUTAS DE ADMINISTRACIÓN (Con su propio AdminLayout) */}
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>

        {/* 4. STRIPE CHECKOUT (Pantalla dedicada) */}
        <Route path="/checkout" element={<CheckoutScreen />} />

        <Route path="/success" element={<SuccessScreen />} />
      </Routes>
    </BrowserRouter>
  </CartProvider>
  )
}

export default App
