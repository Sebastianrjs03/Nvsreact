import Menu from "./components/Menu";
import Promociones from './components/Promociones';
import React from "react";
import './App.css';

export function App() {
  return (

    <React.Fragment> 
    <Menu/>
    <main className="contenedor-inicio-main">
  
    <Promociones Imagen="xbox" ImagenConsola="consolaXbox" consola="xbox"/>
    <Promociones Imagen="play" ImagenConsola="consolaPlay" consola="play"/>
    <Promociones Imagen="nintendo" ImagenConsola="consolaNintendo" consola="nintendo"/>

    </main>
    </React.Fragment>
  );
}

export default App;

