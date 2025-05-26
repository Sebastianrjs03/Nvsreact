import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import React from "react";
import "../styles/Tienda/Perfil.css";
import Menu from "../components/Tienda/Menu";



function Perfil() {
    const Navigate = useNavigate();
    const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("rol");
    Navigate('/iniciarSesion');
}
  return (
    <React.Fragment>
      <Menu />
      <main className="perfil-container">
        <header className="perfil-header">
          <article className="perfil-article">
            <i className="fa-solid fa-circle-user perfil-icono"></i>
            <div className="perfil-info">
              <h2>Andres Felipe mi polla loca</h2>
              <p>Usuario de NVS</p>
            </div>
          </article>
          <button onClick={handleLogout} className="perfil-logout">
            <i className="fa-solid fa-right-to-bracket"></i>
            <span>Cerrar Sesión</span>
          </button>
        </header>
        <div className="perfil-contenedorDatos">
          <aside className="perfil-aside">
            <h3>Seguridad de Cuenta</h3>
            <p>micola@gmail.com</p>
            <nav className="perfil-nav">
              <ul>
                <Link to="/Perfil">
                  <li>
                    <i className="fa-solid fa-envelope"></i>
                    <p>Cambiar Email</p>
                  </li>
                  <i className="fa-solid fa-angle-right"></i>
                </Link>
                <Link to="/Perfil/Historial">
                  <li>
                    <i className="fa-solid fa-lock"></i>
                    <p>Cambiar Contraseña</p>
                  </li>
                  <i className="fa-solid fa-angle-right"></i>
                </Link>
                <Link to="/Perfil/Calificaciones">
                  <li>
                    <i className="fa-solid fa-address-card"></i>
                    <p>Cambiar Nombre</p>
                  </li>
                  <i className="fa-solid fa-angle-right"></i>
                </Link>
                <Link to="/Perfil/Configuracion">
                  <li>
                    <i className="fa-solid fa-location-dot"></i>
                    <p>Cambiar Dirección</p>
                  </li>
                  <i className="fa-solid fa-angle-right"></i>
                </Link>
              </ul>
            </nav>
          </aside>
          <section className="perfil-datos">
            <Outlet/>
          </section>
        </div>
      </main>
    </React.Fragment>
  );
}

export default Perfil;
