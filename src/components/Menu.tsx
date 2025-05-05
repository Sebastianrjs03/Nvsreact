import React, { useState } from 'react';
import '../styles/Menu.css'; 
import Logo from "../assets/logoNVS.svg"


const Menu: React.FC = () => {
  const [menuAbierto, setMenuAbierto] = useState(false);

  const toggleMenu = () => {
    setMenuAbierto(prev => !prev);
  };

  return (
    <header className="efectoBlur2">
      <nav className="menu-principal efectoBlur">

        <div className="hamburger" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <img src={Logo} alt="Logo de NVS" />

        <ul className={`contenedor-lista-principal ${menuAbierto ? 'active' : ''}`}>
          <li><a href="">Inicio</a></li>
          <li><a href="">Videojuegos</a></li>
          <li><a href="">Consolas</a></li>
          <li><a href="">Playstation</a></li>
          <li><a href="">Xbox</a></li>
          <li><a href="">Nintendo</a></li>
        </ul>
      </nav>

      <nav>
        <ul className="contenedor-acceso">
          <li className="acceso efectoBlur"><a href=""><i className="fa-solid fa-magnifying-glass"></i></a></li>
          <li className="acceso efectoBlur"><a href=""><i className="fa-regular fa-user"></i></a></li>
          <li className="acceso efectoBlur"><a href=""><i className="fa-solid fa-cart-shopping"></i></a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Menu;
