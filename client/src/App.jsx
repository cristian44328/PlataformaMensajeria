import Navbar from "./components/Navbar";

import PrincipalPage from "./pages/PrincipalPage"
import LoginPage from "./pages/loginPage"
import RegisterPage from "./pages/registerPage"
import FacturacionPage from "./pages/FacturacionPage"
import ChatsPage from "./pages/ChatsPage"

import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";

import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";

function App() {
  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();

  console.log({ onlineUsers });

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log({ authUser });

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );

  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={authUser ? <PrincipalPage /> : <Navigate to="/login" />} />
        <Route path="/register" element={!authUser ? <RegisterPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/facturacion" element={<FacturacionPage /> } />
        <Route path="/chats" element={authUser ? <ChatsPage /> : <Navigate to="/login" />} />
       
      </Routes>

      <Toaster />
    </div>
  )
}

export default App