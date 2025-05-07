import React from "react";
import Menu from "../components/Tienda/Menu";
import Promociones from '../components/Tienda/Promociones';
import Carrusel from "../components/Tienda/Carrusel";
import Tienda from '../components/Tienda/Tienda'
import Banner from '../components/Tienda/Banner';
import BodyCard from "../components/Tienda/BodyCards";
import ProductosCards from "../components/Tienda/ProductosCards";
import Card from '../components/Tienda/Card'

import '../styles/pages/Inicio.css';

export function Inicio() {
  return (

    <React.Fragment>
      <Menu />
      <main className="inicio-main">

        <Promociones Imagen="xbox" ImagenConsola="consolaXbox" consola="xbox" />
        <Promociones Imagen="play" ImagenConsola="consolaPlay" consola="play" />
        <Promociones Imagen="nintendo" ImagenConsola="consolaNintendo" consola="nintendo" />
        <Carrusel/>
        <Tienda>
          <Banner Imagen="MilesMorales" Titulo="Marvel´s Spider-Man: Miles Morales" Recorte="Morado"/>
          <BodyCard>
          <h2 className="Titulos">Tendencias</h2>
          <ProductosCards>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
          </ProductosCards>
          </BodyCard>

          <BodyCard>
          <h2 className="Titulos">Las ofertas de la semana</h2>
          <ProductosCards>
          <Card/>
          <Card/>
          <Card/>
          </ProductosCards>
          </BodyCard>
        </Tienda>
      </main>
    </React.Fragment>
  );
}

export default Inicio;