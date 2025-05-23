//Routes
import { Outlet, Link } from 'react-router-dom';
//css

//assets
import settingImage from '../../assets/admin/setting.png'
import settingImage1 from '../../assets/logoNVS.svg'

const Sidebar = () => {
    return (
        <div className="container1">
            <div className="sidebar">
                <aside>
                    <div className="profile">
                        <img src={settingImage} alt="configuraciones" />
                        <h2 className="texto1">Admin: Roberto Toto</h2>
                        <p className="texto1">Admin 01</p>
                        <p className="texto2">Se unió: Julio 24 de 2024</p>
                    </div>
                    <div className="contmenu-logo">
                        <nav className="menu">
                            <ul className="ul-menu">
                                <li>
                                    <label htmlFor="usuarios">
                                        <i className="fas fa-users" style={{ fontSize: "30px" }}></i> Usuarios
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
                                        <i className="fas fa-box" style={{ fontSize: "30px" }}></i> Productos
                                    </label>
                                    <input type="checkbox" id="productos" />
                                    <ul>
                                        <a href="../productos/anadir_productos.php">
                                            <li>Añadir Producto</li>
                                        </a>
                                        <a href="../productos/mod_producto_con.php">
                                            <li>Modificar Consolas</li>
                                        </a>
                                        <a href="../productos/anadir_productos.php">
                                            <li>Modificar Videojuegos</li>
                                        </a>
                                        <a href="../productos/mod_marca.php">
                                            <li>Modificar Marca</li>
                                        </a>
                                        <a href="../productos/mod_genero.php">
                                            <li>Modificar Genero</li>
                                        </a>
                                    </ul>
                                </li>

                                <li>
                                    <label htmlFor="factura">
                                        <i className="fa-solid fa-money-bill-1-wave " style={{ fontSize: "30px" }}></i> Facturas
                                    </label>
                                    <input type="checkbox" id="factura" />
                                    <ul>
                                    <Link to={"/Administrador/Facturas"}>
                                            <li>Factura</li>
                                        </Link>
                                        <Link to={"/Administrador/Forma_Pago"}>
                                            <li>Forma Pagos</li>
                                        </Link>
                                    </ul>
                                </li>

                                <li>
                                    <label htmlFor="calificacion">
                                        <i className="fa-solid fa-star" style={{ fontSize: "30px" }}></i> Calificacion
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
                                        <i className="fa-solid fa-paper-plane" style={{ fontSize: "30px" }}></i>Envios
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
                                        <i className="fas fa-cogs" style={{ fontSize: "30px" }}></i> Soporte
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
                    </div>
                </aside>

            </div>
            <Outlet />
        </div>
    )
};

export default Sidebar;
