//Routes
import { Outlet, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
//css

//assets
import settingImage from "../../assets/admin/setting.png";
import settingImage1 from "../../assets/logoNVS.svg";


const Sidebar = () => {
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

  return (
    <div className="container1">
      <div className="sidebar">
        <aside>
          <div className="profile">
            <img src={settingImage} alt="configuraciones" />
            <h2 className="texto1">Admin: {nombreUsuario}</h2>
            <p className="texto2">Admini ID: {usuario?.idUsuario}</p>
            <p className="texto3">Se unió: Julio 24 de 2024</p>
          </div>
          <div className="contmenu-logo">
            <nav className="menu">
              <ul className="ul-menu">
                <li>
                  <label htmlFor="usuarios">
                    <i
                      className="fas fa-users"
                      style={{ fontSize: "30px" }}
                    ></i>{" "}
                    Usuarios
                  </label>
                  <input type="checkbox" id="usuarios" />
                  <ul>
                    <Link to={"/Administrador/Usuarios"}>
                      <li>Modificar Usuarios</li>
                    </Link>
                  </ul>
                </li>

                <li>
                  <label htmlFor="productos">
                    <i className="fas fa-box" style={{ fontSize: "30px" }}></i>{" "}
                    Productos
                  </label>
                  <input type="checkbox" id="productos" />
                  <ul>
                    <Link to={"/Administrador/Productos"}>
                      <li>Consultar Productos</li>
                    </Link>
                    <Link to={"/Administrador/Plataforma"}>
                      <li>Modificar Plataforma</li>
                    </Link>
                    <Link to={"/Administrador/Genero"}>
                      <li>Modificar Genero</li>
                    </Link>
                  </ul>
                </li>

                <li>
                  <label htmlFor="factura">
                    <i
                      className="fa-solid fa-money-bill-1-wave "
                      style={{ fontSize: "30px" }}
                    ></i>{" "}
                    Facturas
                  </label>
                  <input type="checkbox" id="factura" />
                  <ul>
                    <Link to={"/Administrador/Facturas"}>
                      <li>Factura</li>
                    </Link>
                    <Link to={"/Administrador/Detalles_Factura"}>
                      <li>Detalles Factura</li>
                    </Link>
                    <Link to={"/Administrador/Forma_Pago"}>
                      <li>Forma Pagos</li>
                    </Link>
                  </ul>
                </li>

                <li>
                  <label htmlFor="calificacion">
                    <i
                      className="fa-solid fa-star"
                      style={{ fontSize: "30px" }}
                    ></i>{" "}
                    Calificacion
                  </label>
                  <input type="checkbox" id="calificacion" />
                  <ul>
                    <Link to={"/Administrador/Calificacion_Cliente"}>
                      <li>Calificaciones Producto</li>
                    </Link>
                  </ul>
                </li>

                <li>
                  <label htmlFor="envios">
                    <i
                      className="fa-solid fa-paper-plane"
                      style={{ fontSize: "30px" }}
                    ></i>
                    Envios
                  </label>
                  <input type="checkbox" id="envios" />
                  <ul>
                    <a href="../envios/mod_envio.php">
                      <li>Envios</li>
                    </a>
                    <a href="../envios/mod_estadoenvio.php">
                      <li>Estado de envio</li>
                    </a>
                  </ul>
                </li>
                <li>
                  <label htmlFor="soporte">
                    <i className="fas fa-cogs" style={{ fontSize: "30px" }}></i>{" "}
                    Soporte
                  </label>
                  <input type="checkbox" id="soporte" />
                  <ul>
                    <a href="../soporte/mod_soporte.php">
                      <li>PQRS</li>
                    </a>
                  </ul>
                </li>
              </ul>
            </nav>
            <img src={settingImage1} alt="" className="logo" />
            <button onClick={handleLogout} className="admin-logout">
              <i className="fa-solid fa-right-to-bracket"></i>
              <span>Cerrar Sesión</span>
            </button>
          </div>
        </aside>
      </div>
      <Outlet />
    </div>
  );
};

export default Sidebar;
