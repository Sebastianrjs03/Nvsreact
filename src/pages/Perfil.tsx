import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import React from "react";
import "../styles/Tienda/Perfil.css";
import Menu from "../components/Tienda/Menu";

function Perfil() {
  const Navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("rol");
    localStorage.removeItem("usuario");
    Navigate("/iniciarSesion");
    window.location.reload();
  };

  const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");

  const nombreUsuario =
    `${usuario?.nombreUsuario} ${usuario?.senombreUsuario} ${usuario?.apellidoUsuario} ${usuario?.seapellidoUsuario}` ||
    "Usuario Desconocido";

  const complemento = usuario?.complemento ? `| ${usuario.complemento}` : "";

  return (
    <React.Fragment>
      <Menu />
      <main className="perfil-container">
        <header className="perfil-header">
          <article className="perfil-article">
            <i className="fa-solid fa-circle-user perfil-icono"></i>
            <div className="perfil-info">
              <h2>{nombreUsuario}</h2>
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
            <p>{usuario?.correoUsuario ?? "Correo no disponible"}</p>
            <p>{usuario?.direccion} {complemento}</p>
            <nav className="perfil-nav">
              <ul>
                <Link to="Cambiar/Email">
                  <li>
                    <i className="fa-solid fa-envelope"></i>
                    <p>Cambiar Email</p>
                  </li>
                  <i className="fa-solid fa-angle-right"></i>
                </Link>
                <Link to="Cambiar/Contrasena">
                  <li>
                    <i className="fa-solid fa-lock"></i>
                    <p>Cambiar Contraseña</p>
                  </li>
                  <i className="fa-solid fa-angle-right"></i>
                </Link>
                <Link to="Cambiar/DatosPersonales">
                  <li>
                    <i className="fa-solid fa-address-card"></i>
                    <p>Cambiar datos personales</p>
                  </li>
                  <i className="fa-solid fa-angle-right"></i>
                </Link>
                <Link to="Cambiar/Direccion">
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
            <Outlet />
          </section>
        </div>
      </main>
    </React.Fragment>
  );
}

export default Perfil;
