import React from "react";
import Menu from "../components/Tienda/Menu";
import Tienda from "../components/Tienda/Tienda";
import Banner from "../components/Tienda/Banner";
import BodyCard from "../components/Tienda/BodyCards";
import ProductosCards from "../components/Tienda/ProductosCards";
import Card from "../components/Tienda/Card";

import "../styles/pages/Nintendo.css";

export function Inicio() {
  return (
    <React.Fragment>
      <Menu />
      <main className="nintendo-main">
        <Tienda>
          <Banner
            Imagen="Mario"
            Titulo="Luigi's Mansion 2 HD Switch"
            Recorte="Nintendo"
          />
          <BodyCard>
            <BodyCard>
              <h2 className="Titulos">Lo más vendido</h2>
              <ProductosCards>
                <Card consola="nintendo" />
                <Card consola="nintendo" />
                <Card consola="nintendo" />
              </ProductosCards>
            </BodyCard>
            <h2 className="Titulos">Tendencias</h2>
            <ProductosCards>
              <Card consola="nintendo" />
              <Card consola="nintendo" />
              <Card consola="nintendo" />
              <Card consola="nintendo" />
              <Card consola="nintendo" />
              <Card consola="nintendo" />
              <Card consola="nintendo" />
              <Card consola="nintendo" />
              <Card consola="nintendo" />
            </ProductosCards>
          </BodyCard>

          <BodyCard>
            <h2 className="Titulos">Las ofertas de la semana</h2>
            <ProductosCards>
              <Card consola="nintendo" />
              <Card consola="nintendo" />
              <Card consola="nintendo" />
            </ProductosCards>
          </BodyCard>
        </Tienda>
      </main>
    </React.Fragment>
  );
}

export default Inicio;
