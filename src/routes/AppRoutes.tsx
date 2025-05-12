import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from "../components/Scroll/ScrollTop";
import Inicio from '../pages/Inicio';
import Videojuegos from '../pages/Videojuegos';
import Consolas from '../pages/Consolas';
import Playstation from '../pages/Playstation';
import Xbox from '../pages/Xbox';
import Nintendo from '../pages/Nintendo';
import Carrito from '../pages/carrito/Carrito'
import Login from '../pages/login/iniciarSesion/iniciarSesion';
import Registro from '../pages/login/registro/registro';
import RecuperarContrasena from '../pages/login/recuperarContrasena/RecuperarContrasena';


export default function AppRoutes() {
  return (
    <Router>
       <ScrollToTop />
      <Routes>
        <Route path="/" element={<Inicio/>} />
        <Route path="/videojuegos" element={<Videojuegos/>} />
        <Route path="/consolas" element={<Consolas/>} />
        <Route path="/Playstation" element={<Playstation/>} />
        <Route path="/Xbox" element={<Xbox/>} />
        <Route path="/Nintendo" element={<Nintendo/>} />
        <Route path="/Carrito" element={<Carrito/>} />
        <Route path="/iniciarSesion" element={<Login/>} />
        <Route path="/registro" element={<Registro/>} />
        <Route path="/RecuperarContrasena" element={<RecuperarContrasena/>} />

      </Routes>
    </Router>
  );
}
