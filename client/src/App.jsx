import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"

import LoginPage from "./pages/loginPage"
import RegisterPage from "./pages/registerPage"

function App() {
  return (

    <div className="w-full h-screen bg">
      <AuthProvider>
      <BrowserRouter className="w-full h-screen bg">
        <Routes>
          <Route path="/" element={<h1>Home page</h1>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </BrowserRouter>
      </AuthProvider>
    </div>
  )
}

export default App