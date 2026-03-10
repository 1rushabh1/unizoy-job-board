import { BrowserRouter, Routes, Route } from "react-router-dom"
import Admin from "./pages/Admin"
import Jobs from "./pages/Jobs"
import AdminLogin from "./pages/AdminLogin"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Jobs />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin-login" element={<AdminLogin/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App