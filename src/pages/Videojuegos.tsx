import React, { useEffect, useState } from "react";
import Menu from "../components/Tienda/Menu";
import Tienda from "../components/Tienda/Tienda";
import Banner from "../components/Tienda/Banner";
import BodyCard from "../components/Tienda/BodyCards";
import ProductosCards from "../components/Tienda/ProductosCards";
import Card from "../components/Tienda/Card";

import "../styles/pages/Videojuegos.css";

interface Producto {
  idProducto: string;
  nombreProducto: string;
  precioProducto: number;
}

export function Videojuegos() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [tendencias, setTendencias] = useState<Producto[]>([]);

  useEffect(() => {
    const tipoProducto = "Videojuego";

    const urls = [
      `http://localhost/api-php?ruta=obtenerProductosDesc&tipoProducto=${tipoProducto}`,
      `http://localhost/api-php?ruta=obtenerProductosTendencias&tipoProducto=${tipoProducto}`,
    ];

    Promise.all(urls.map((url) => fetch(url).then((res) => res.json())))
      .then(([dataVendidos, dataTendencias]) => {
        setProductos(dataVendidos);
        setTendencias(dataTendencias);
      })
      .catch((error) => {
        console.error("Error al obtener datos:", error);
      });
  }, []);

  return (
    <React.Fragment>
      <Menu />
      <main className="videojuegos-main">
        <Tienda>
          <Banner
            Imagen="RedDeadRedemption2"
            Titulo="Red Dead Redemption II"
            Recorte="Morado"
          />
          <BodyCard>
            <h2 className="Titulos">Lo más vendido</h2>

            <ProductosCards>
              {productos.map((producto) => (
                <Card
                  key={producto.idProducto}
                  consola="default"
                  titulo={producto.nombreProducto}
                  precio={producto.precioProducto}
                  imagen={producto.idProducto}
                />
              ))}
            </ProductosCards>
          </BodyCard>
          <BodyCard>
            <h2 className="Titulos">Tendencias</h2>
            <ProductosCards>
              {tendencias.map((tendencias) => (
                <Card
                  key={tendencias.idProducto}
                  consola="default"
                  titulo={tendencias.nombreProducto}
                  precio={tendencias.precioProducto}
                  imagen={tendencias.idProducto}
                />
              ))}
            </ProductosCards>
          </BodyCard>

          <BodyCard>
            <h2 className="Titulos">Las Mejores Ofertas</h2>
            <ProductosCards>
              
            </ProductosCards>
          </BodyCard>
        </Tienda>
      </main>
    </React.Fragment>
  );
}

export default Videojuegos;
