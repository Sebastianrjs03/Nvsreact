import React, { useEffect, useState } from "react";
import Menu from "../components/Tienda/Menu";
import Tienda from "../components/Tienda/Tienda";
import Banner from "../components/Tienda/Banner";
import BodyCard from "../components/Tienda/BodyCards";
import ProductosCards from "../components/Tienda/ProductosCards";
import Card from "../components/Tienda/Card";

import "../styles/pages/Nintendo.css";

interface Producto {
  idProducto: string;
  nombreProducto: string;
  precioProducto: number;
}

export function Inicio() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [tendencias, setTendencias] = useState<Producto[]>([]);
  const [exclusivos, setExclusivos] = useState<Producto[]>([]);

  useEffect(() => {
    const tipoProducto = "Videojuego";
    const plataforma = "Nintendo";

    const urls = [
      `http://localhost/api-php?ruta=obtenerProductosDesc&tipoProducto=${tipoProducto}&plataforma=${plataforma}`,
      `http://localhost/api-php?ruta=obtenerProductosTendencias&tipoProducto=${tipoProducto}&plataforma=${plataforma}`,
      `http://localhost/api-php?ruta=obtenerProductosExclusivos&plataforma=${plataforma}`,
    ];

    Promise.all(urls.map((url) => fetch(url).then((res) => res.json())))
      .then(([dataVendidos, dataTendencias, dataExclusivos]) => {
        setProductos(dataVendidos);
        setTendencias(dataTendencias);
        setExclusivos(dataExclusivos);
      })
      .catch((error) => {
        console.error("Error al obtener datos:", error);
      });
  }, []);

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
                {productos.map((producto) => (
                  <Card
                    key={producto.idProducto}
                    consola="nintendo"
                    titulo={producto.nombreProducto}
                    precio={producto.precioProducto}
                    imagen={producto.idProducto}
                  />
                ))}
              </ProductosCards>
            </BodyCard>
            <h2 className="Titulos">Tendencias</h2>
            <ProductosCards>
              {tendencias.map((tendencias) => (
                <Card
                  key={tendencias.idProducto}
                  consola="nintendo"
                  titulo={tendencias.nombreProducto}
                  precio={tendencias.precioProducto}
                  imagen={tendencias.idProducto}
                />
              ))}
            </ProductosCards>
          </BodyCard>

          <BodyCard>
            <h2 className="Titulos">Las ofertas de la semana</h2>
            <ProductosCards>
              {exclusivos.map((exclusivos) => (
                <Card
                  key={exclusivos.idProducto}
                  consola="nintendo"
                  titulo={exclusivos.nombreProducto}
                  precio={exclusivos.precioProducto}
                  imagen={exclusivos.idProducto}
                />
              ))}
            </ProductosCards>
          </BodyCard>
        </Tienda>
      </main>
    </React.Fragment>
  );
}

export default Inicio;
