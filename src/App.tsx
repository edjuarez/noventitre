import './App.css'
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import HomeScreen from "./pages/HomeScreen";
import CollectionScreen from "./pages/CollectionScreen";
import ProductDetailScreen from "./pages/ProductDetailScreen";
import LoginScreen from "./pages/LoginScreen";
import Navbar from './components/Navbar';
import AdminDashboard from './pages/AdminDashboard';
import AdminLayout from './components/admin/AdminLayout';


function App() {
  const MainLayout = () => (
    <div className="min-h-screen bg-brand-crema text-black antialiased selection:bg-brand-rosa selection:text-white">
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );

  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        { path: "/", element: <HomeScreen /> },
        { path: "/catalogo", element: <CollectionScreen /> },
        { path: "/product/:slug", element: <ProductDetailScreen /> }
      ]
    },
    // Ruta de Login
    {
      path: "/login",
      element: <LoginScreen />
    },
    // Rutas de Administración Protegidas
    {
      path: "/admin",
      element: <AdminLayout />,
      children: [
        { path: "/admin", element: <AdminDashboard /> }
      ]
    }
  ]);

  return (
    <RouterProvider router={router} />
  )
}

export default App
