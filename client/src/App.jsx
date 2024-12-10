import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"

import PrincipalPage from "./pages/PrincipalPage"
import LoginPage from "./pages/loginPage"
import RegisterPage from "./pages/registerPage"
import FacturacionPage from "./pages/FacturacionPage"
import ChatsPage from "./pages/ChatsPage"

import ProtectedRoute from "./ProtectedRoute"

function App() {
  return (

    <div className="w-full h-screen bg">
      <AuthProvider>
      <BrowserRouter className="w-full h-screen bg">
        <Routes>
          <Route path="/" element={< PrincipalPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route element={<ProtectedRoute/>} >
          <Route path="/chats" element={<ChatsPage />} />
          <Route path="/facturacion" element={<FacturacionPage />} />
          </Route>
          
        </Routes>
      </BrowserRouter>
      </AuthProvider>
    </div>
  )
}

export default App