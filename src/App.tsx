import Menu from "./components/Tienda/Menu";
import Promociones from './components/Tienda/Promociones';
import Cards from './components/Tienda/Carrusel';
import Tienda from './components/Tienda/Tienda'

import Banner from './components/Tienda/Banner';

import React from "react";
import './App.css';
import ProductosCards from "./components/Tienda/ProductosCards";

export function App() {
  return (

    <React.Fragment> 
    <Menu/>
    <main className="contenedor-inicio-main">
  
    <Promociones Imagen="xbox" ImagenConsola="consolaXbox" consola="xbox"/>
    <Promociones Imagen="play" ImagenConsola="consolaPlay" consola="play"/>
    <Promociones Imagen="nintendo" ImagenConsola="consolaNintendo" consola="nintendo"/>
    <Cards/>
    <Tienda>
    <Banner Imagen="MilesMorales" Titulo="Marvel´s Spider-Man: Miles Morales" />
    <h2 className="Titulos">Tendencias</h2>
    <ProductosCards/>
    </Tienda>

    </main>
    </React.Fragment>
  );
}

export default App;

