import { Login } from './Pages/Login/Login';
import { Registro } from './Pages/Registro/Registro';
import { Main } from './Pages/Main/main';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AmigosPag } from './Pages/Amigos/Amigos';
import { PerfilPag } from './Pages/Perfil/Perfiles';
import { ToastContainer, toast } from 'react-toastify';
import { DarkModeProvider } from './Componentes/darkmode';
import { Admin } from './Pages/Admin/Admin';

function Logcheck({ pag }) {
  const log = sessionStorage.getItem('logueado');

  if (log === "true") {
    return pag;
  } else {
    if (!toast.isActive("loginError")) {
      toast.error("Debes iniciar sesión para acceder a esta página", { toastId: "loginError" });
    }
    return <Navigate to="/" replace />;
  }
}

function App() {
  
  return (
    <DarkModeProvider>
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Registro" element={<Registro />} />
        <Route path="/Amigos" element={<Logcheck pag={<AmigosPag />} />} />
        <Route path="/Home" element={<Logcheck pag={<Main />} />} />
        <Route path="/perfil/:id" element={<Logcheck pag={<PerfilPag />} />} />
        <Route path='/Admin' element={<Logcheck pag={<Admin />} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
    </DarkModeProvider>
  );
}

export default App;
