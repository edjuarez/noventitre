import './App.css'
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import HomeScreen from "./pages/HomeScreen";
import CollectionScreen from "./pages/CollectionScreen";
import Navbar from './components/Navbar'

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
        { path: "/collection", element: <CollectionScreen /> }
      ]
    }
  ]);

  return (
    <RouterProvider router={router} />
  )
}

export default App
