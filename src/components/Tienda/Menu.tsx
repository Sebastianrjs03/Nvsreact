import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../styles/Tienda/Menu.css";
import Logo from "../../assets/logoNVS.svg";

const Menu: React.FC = () => {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const menuRef = useRef<HTMLUListElement>(null);
  const menuBotonRef = useRef<HTMLDivElement>(null); // Ref para el botón hamburguesa

  const toggleMenu = () => {
    setMenuAbierto((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        menuBotonRef.current &&
        !menuBotonRef.current.contains(event.target as Node)
      ) {
        setMenuAbierto(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="menu-header">
      <nav className="menu-nav">
        <div
          ref={menuBotonRef}
          className="menu-boton-hamburger"
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        <img src={Logo} alt="Logo de NVS" />

        <ul
          ref={menuRef}
          className={`menu-listaPrincipal ${menuAbierto ? "active" : ""}`}
        >
          <Link to="/">
            <li>Inicio</li>
          </Link>
          <Link to="/videojuegos">
            <li>Videojuegos</li>
          </Link>
          <Link to="/consolas">
            <li>Consolas</li>
          </Link>
          <Link to="/playstation">
            <li>Playstation</li>
          </Link>
          <Link to="/xbox">
            <li>Xbox</li>
          </Link>
          <Link to="/nintendo">
            <li>Nintendo</li>
          </Link>
        </ul>
      </nav>

      <nav>
        <ul className="menu-listaResponsive">
          <li className="menu-listaResponsive-botones">
            <a href="">
              <i className="fa-solid fa-magnifying-glass"></i>
            </a>
          </li>
          <Link to={"/iniciarSesion"}>
            <li className="menu-listaResponsive-botones">
              <i className="fa-regular fa-user"></i>
            </li>
          </Link>
          <Link to={"/Carrito"}>
            <li className="menu-listaResponsive-botones">
              <i className="fa-solid fa-cart-shopping"></i>
            </li>
          </Link>
        </ul>
      </nav>
    </header>
  );
};

export default Menu;
