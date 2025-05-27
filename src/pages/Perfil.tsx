import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import React from "react";
import "../styles/Tienda/Perfil.css";
import Menu from "../components/Tienda/Menu";

interface MyJwtPayload {
  correo: string;
  nombre: string;
  segundoNombre: string;
  apellido: string;
  segundoApellido: string;
  rol: string;
  exp: number;
}

function Perfil() {
  const Navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("rol");
    Navigate("/iniciarSesion");
  };

  const token = localStorage.getItem("token");

  let decoded: MyJwtPayload | null = null;

  if (token) {
    decoded = jwtDecode<MyJwtPayload>(token);
  }

  const nombreUsuario = `${decoded?.nombre} ${decoded?.segundoNombre} ${decoded?.apellido} ${decoded?.segundoApellido}`  || "Usuario Desconocido";

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
            <p>{decoded?.correo ?? "Correo no disponible"}</p>
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