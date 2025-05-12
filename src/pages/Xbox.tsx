import React from "react";
import Menu from "../components/Tienda/Menu";
import Tienda from "../components/Tienda/Tienda";
import Banner from "../components/Tienda/Banner";
import BodyCard from "../components/Tienda/BodyCards";
import ProductosCards from "../components/Tienda/ProductosCards";
import Card from "../components/Tienda/Card";

import "../styles/pages/Xbox.css";

export function Inicio() {
  return (
    <React.Fragment>
      <Menu />
      <main className="xbox-main">
        <Tienda>
          <Banner Imagen="Hallo" Titulo="Hallo Infinity" Recorte="Xbox" />
          <BodyCard>
            <BodyCard>
              <h2 className="Titulos">Lo más vendido</h2>
              <ProductosCards>
                <Card consola="xbox" />
                <Card consola="xbox" />
                <Card consola="xbox" />
              </ProductosCards>
            </BodyCard>
            <h2 className="Titulos">Tendencias</h2>
            <ProductosCards>
              <Card consola="xbox" />
              <Card consola="xbox" />
              <Card consola="xbox" />
              <Card consola="xbox" />
              <Card consola="xbox" />
              <Card consola="xbox" />
              <Card consola="xbox" />
              <Card consola="xbox" />
              <Card consola="xbox" />
            </ProductosCards>
          </BodyCard>

          <BodyCard>
            <h2 className="Titulos">Las ofertas de la semana</h2>
            <ProductosCards>
              <Card consola="xbox" />
              <Card consola="xbox" />
              <Card consola="xbox" />
            </ProductosCards>
          </BodyCard>
        </Tienda>
      </main>
    </React.Fragment>
  );
}

export default Inicio;
