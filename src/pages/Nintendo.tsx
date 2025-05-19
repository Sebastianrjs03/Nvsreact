import React, { useEffect, useState } from "react";
import Menu from "../components/Tienda/Menu";
import Tienda from "../components/Tienda/Tienda";
import Banner from "../components/Tienda/Banner";
import BodyCard from "../components/Tienda/BodyCards";
import ProductosCards from "../components/Tienda/ProductosCards";
import Card from "../components/Tienda/Card";
import CategotiasContenedor from "../components/Tienda/CategoriasContenedor";
import Categorias from "../components/Tienda/CategoriasComponent";
import "../styles/Tienda/Link.css";
import { Link } from "react-router-dom";

import "../styles/pages/Nintendo.css";

interface Producto {
  idProducto: string;
  totalProducto: number;
  nombreProducto: string;
  precioProducto: number;
}

interface GeneroJuegos {
  idGeneroJuego: string;
  estadoGeneroJuego: string;
}

export function Nintendo() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [tendencias, setTendencias] = useState<Producto[]>([]);
  const [exclusivos, setExclusivos] = useState<Producto[]>([]);
  const [generosJuegos, setGenerosJuegos] = useState<GeneroJuegos[]>([]);

  useEffect(() => {
    const tipoProducto = "Videojuego";
    const plataforma = "nintendo";

    const urls = [
      `http://localhost/api-php?ruta=obtenerProductosDesc&tipoProducto=${tipoProducto}&plataforma=${plataforma}`,
      `http://localhost/api-php?ruta=obtenerProductosTendencias&tipoProducto=${tipoProducto}&plataforma=${plataforma}`,
      `http://localhost/api-php?ruta=obtenerProductosExclusivos&plataforma=${plataforma}`,
      `http://localhost/api-php?ruta=obtenerProductosDesc&tipoProducto=${tipoProducto}&generosJuegos=1`,
    ];

    Promise.all(urls.map((url) => fetch(url).then((res) => res.json())))
      .then(([dataVendidos, dataTendencias, dataExclusivos, dataGeneros]) => {
        setProductos(dataVendidos);
        setTendencias(dataTendencias);
        setExclusivos(dataExclusivos);
        setGenerosJuegos(dataGeneros);
      })
      .catch((error) => {
        console.error("Error al obtener datos:", error);
      });
  }, []);

  const primerProducto = exclusivos[0];
  const precioTotal = primerProducto?.totalProducto;
  const precio = primerProducto?.precioProducto;

  const descuento = precioTotal === precio ? undefined : precio;

  return (
    <React.Fragment>
      <Menu />
      <main className="nintendo-main">
        <Tienda>
          <Banner
            Imagen={primerProducto?.idProducto}
            Titulo={primerProducto?.nombreProducto}
            Recorte="Nintendo"
            precio={precioTotal}
            descuento={descuento}
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
          <BodyCard>
            <h2 className="Titulos-disposicion">Filtra Por Tus preferencias</h2>
            <CategotiasContenedor>
              {generosJuegos.map((genero) => (
                <Link
                  to={`/Categorias/${genero.idGeneroJuego}/playstation`}
                  className="linkCardsGeneros"
                  key={genero.idGeneroJuego}
                >
                  <Categorias
                    consola="nintendo"
                    titulo={genero.idGeneroJuego}
                  ></Categorias>
                </Link>
              ))}
            </CategotiasContenedor>
          </BodyCard>
        </Tienda>
      </main>
    </React.Fragment>
  );
}

export default Nintendo;
