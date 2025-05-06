import React, { useState, useRef, useEffect } from "react";
import "../../styles/Tienda/Menu.css";
import Logo from "../../assets/logoNVS.svg";

const Menu: React.FC = () => {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const menuRef = useRef<HTMLUListElement>(null);

  const toggleMenu = () => {
    setMenuAbierto((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuAbierto(false);
      }
    };

    if (menuAbierto) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuAbierto]);

  return (
    <header className="menu-header">
      <nav className="menu-nav">
        <div className="menu-boton-hamburger" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <img src={Logo} alt="Logo de NVS" />

        <ul
          ref={menuRef}
          className={`menu-listaPrincipal ${menuAbierto ? "active" : ""}`}
        >
          <a href="">
            <li>Inicio</li>
          </a>
          <a href="">
            <li>Videojuegos</li>
          </a>
          <a href="">
            <li>Consolas</li>
          </a>
          <a href="">
            <li>Playstation</li>
          </a>
          <a href="">
            <li>Xbox</li>
          </a>
          <a href="">
            <li>Nintendo</li>
          </a>
        </ul>
      </nav>

      <nav>
        <ul className="menu-listaResponsive">
          <li className="menu-listaResponsive-botones">
            <a href="">
              <i className="fa-solid fa-magnifying-glass"></i>
            </a>
          </li>
          <li className="menu-listaResponsive-botones">
            <a href="">
              <i className="fa-regular fa-user"></i>
            </a>
          </li>
          <li className="menu-listaResponsive-botones">
            <a href="">
              <i className="fa-solid fa-cart-shopping"></i>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Menu;
