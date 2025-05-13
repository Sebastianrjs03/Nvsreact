import React from "react";
import Menu from "../components/Tienda/Menu";
import Tienda from "../components/Tienda/Tienda";
import Banner from "../components/Tienda/Banner";
import BodyCard from "../components/Tienda/BodyCards";
import ProductosCards from "../components/Tienda/ProductosCards";
import Card from "../components/Tienda/Card";
import { Link } from 'react-router-dom';

import "../styles/pages/Videojuegos.css";

export function Consolas() {
  return (
    <React.Fragment>
      <Menu />
      <main className="videojuegos-main">
        <Tienda>
          <Banner
            Imagen="Consolas"
            Titulo="PlayStation 5 Slim"
            Recorte="Morado"
          />
          <BodyCard>
            <h2 className="Titulos">Lo más vendido</h2>
            <ProductosCards>
              <Link to="/DetallesConsola">
              <Card consola="default" />
              </Link>
            </ProductosCards>
          </BodyCard>
          <BodyCard>
            <h2 className="Titulos">Tendencias</h2>
            <ProductosCards>
              <Card consola="default" />
              <Card consola="default" />
              <Card consola="default" />
              <Card consola="default" />
              <Card consola="default" />
              <Card consola="default" />
              <Card consola="default" />
              <Card consola="default" />
              <Card consola="default" />
            </ProductosCards>
          </BodyCard>

          <BodyCard>
            <h2 className="Titulos">Las ofertas de la semana</h2>
            <ProductosCards>
              <Card consola="default" />
              <Card consola="default" />
              <Card consola="default" />
            </ProductosCards>
          </BodyCard>
        </Tienda>
      </main>
    </React.Fragment>
  );
}

export default Consolas;
