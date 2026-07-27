import { Routes, Route } from "react-router-dom";
import HomeScreen from "../pages/HomeScreen";
import CollectionScreen from "../pages/CollectionScreen";
import ProductDetailScreen from "../pages/ProductDetailScreen";
import LoginScreen from "../pages/LoginScreen";
import CheckoutScreen from "../pages/CheckoutScreen";
import Navbar from '../components/Navbar';
import AdminDashboard from '../pages/AdminDashboard';
import AdminLayout from '../components/admin/AdminLayout';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomeScreen />} />
      <Route path="/product/:id" element={<CollectionScreen />} />
      <Route path="/cart" element={<CheckoutScreen />} />
    </Routes>
  );
}