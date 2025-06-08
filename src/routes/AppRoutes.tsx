import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from "../components/Scroll/ScrollTop";
import Inicio from '../pages/Inicio';
import Videojuegos from '../pages/Videojuegos';
import Consolas from '../pages/Consolas';
import Playstation from '../pages/Playstation';
import Xbox from '../pages/Xbox';
import Nintendo from '../pages/Nintendo';
import Categorias from '../pages/Categorias';
import Carrito from '../pages/carrito/Carrito'
import Pagos from '../pages/carrito/Pagos';
import Login from '../pages/login/iniciarSesion/iniciarSesion';
import Registro from '../pages/login/registro/registro';
import RecuperarContrasena from '../pages/login/recuperarContrasena/RecuperarContrasena';
import DetallesConsola from '../pages/detallesProducto/detallesConsola';
import DetallesVideoJuego from '../pages/detallesProducto/detallesVideoJuego'

import Celador from '../components/login/Celador';
import Perfil from '../pages/Perfil';
import Email from '../pages/perfil/Email';
import Contrasena from '../pages/perfil/Contrasena';
import Direccion from '../pages/perfil/Direccion';
import Nombres from '../pages/perfil/Nombres';


//Admin
import Sidebar from '../components/Admin/Sidebar';
import Usuario from '../pages/admin/Usuarios/Usuario';
import MostrarProductos from '../pages/admin/Productos/Producto';
import AgregarConsolas from '../components/Admin/Productos/Consolas/agregarConsolas';
import AgregarJuegos from '../components/Admin/Productos/Videojuegos/agregarJuegos';
import GeneroPage from '../pages/admin/Productos/Genero';
import PlataformaPage from '../pages/admin/Productos/Plataforma';
import FacturaPage from '../pages/admin/Facturas/Factura';
import DetallesFacturaPage from '../pages/admin/Facturas/DetalleFactura';
import CalificacionCliente from '../pages/admin/Calificaciones/CalCliente';


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
        <Route path="/Categorias/:id" element={<Categorias />} />
        <Route path="/Categorias/:id/:idPlataforma" element={<Categorias/>} />
        <Route path="/Carrito" element={<Carrito/>} />
        <Route path="/Pagos" element={<Pagos/>} />
        <Route path="/iniciarSesion" element={<Login/>} />
        <Route path="/registro" element={<Registro/>} />
        <Route path="/RecuperarContrasena" element={<RecuperarContrasena/>} />
        <Route path="/DetallesConsola/:id" element={<DetallesConsola/>} />
        <Route path="/DetallesVideoJuego/:id" element={<DetallesVideoJuego/>} />

      

        <Route path="/Perfil" 
         element={
          <Celador rolPermitido='1'>
             <Perfil/>
          </Celador>}>
          <Route path='Cambiar/Email' element={<Email/>}></Route>
          <Route path='Cambiar/Contrasena' element={<Contrasena/>}></Route>
          <Route path='Cambiar/Direccion' element={<Direccion/>}></Route>
          <Route path='Cambiar/DatosPersonales' element={<Nombres/>}></Route>
        </Route>
        
        <Route path="/Administrador" 
         element={
             <Celador rolPermitido='2'>
             <Sidebar/>
         </Celador>}>
          <Route path='/Administrador/Usuarios' element={<Usuario/>}></Route>
          <Route path='/Administrador/Productos' element={<MostrarProductos/>}></Route>
          <Route path='/Administrador/Agregar_Consola/:id?' element={<AgregarConsolas/>}></Route>
          <Route path='/Administrador/Agregar_Juego/:id?' element={<AgregarJuegos/>}></Route>
          <Route path='/Administrador/Plataforma' element={<PlataformaPage/>}></Route>
          <Route path='/Administrador/Genero' element={<GeneroPage/>}></Route>
          <Route path='/Administrador/Facturas' element={<FacturaPage/>}></Route>
          <Route path='/Administrador/Detalles_Factura' element={<DetallesFacturaPage/>}></Route>         
          <Route path='/Administrador/Calificacion_Cliente' element={<CalificacionCliente/>}></Route>
        </Route>
      </Routes>
    </Router>
  );
}
