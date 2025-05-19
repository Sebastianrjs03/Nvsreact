import React, { useEffect, useState } from "react";
import Menu from "../components/Tienda/Menu";
import Tienda from "../components/Tienda/Tienda";
import Banner from "../components/Tienda/Banner";
import BodyCard from "../components/Tienda/BodyCards";
import ProductosCards from "../components/Tienda/ProductosCards";
import Card from "../components/Tienda/Card";
import { Link } from "react-router-dom";
import "../styles/Tienda/Link.css";
import "../styles/pages/Videojuegos.css";
import { ApiPublic } from "../hooks/UseFetch";

interface Producto {
  idProducto: string;
  totalProducto: number;
  precioProducto: number;
  nombreProducto: string;
}

export function Consolas() {
  const [productos, setProductos] = React.useState<Producto[]>([]);

  useEffect(() => {
    const tipoProducto = "Consola";

    const FetchData = async () => {
      try {
        const dataProductos = await ApiPublic("obtenerProductosDesc", {
          tipoProducto,
        });

        setProductos(dataProductos || []);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };

    FetchData();
  }, []);

  return (
    <React.Fragment>
      <Menu />
      <main className="videojuegos-main">
        <Tienda>
          <Banner
            Imagen="Consolas"
            Titulo="PlayStation 5 Slim"
            Recorte="Default"
          />
          <BodyCard>
            <h2 className="Titulos">Lo más vendido</h2>
            <ProductosCards>
              {productos.map((producto) => (
                <Link
                  className="linkCards"
                  key={producto.idProducto}
                  to="/DetallesConsola"
                >
                  <Card
                    consola="default"
                    titulo={producto.nombreProducto}
                    precio={producto.precioProducto}
                    imagen={producto.idProducto}
                  />
                </Link>
              ))}
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
