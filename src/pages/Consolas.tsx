import React, { useEffect, useState } from "react";
import Menu from "../components/Tienda/Menu";
import Tienda from "../components/Tienda/Tienda";
import Banner from "../components/Tienda/Banner";
import BodyCard from "../components/Tienda/BodyCards";
import ProductosCards from "../components/Tienda/ProductosCards";
import Card from "../components/Tienda/Card";
import Descuento from "../components/Tienda/Descuento";
import { Link } from "react-router-dom";
import "../styles/Tienda/Link.css";
import "../styles/pages/Videojuegos.css";
import { ApiPublic } from "../hooks/UseFetch";

interface Producto {
  idProducto: string;
  totalProducto: number;
  precioProducto: number;
  nombreProducto: string;
  descuentoProducto: number;
}

export function Consolas() {
  const [productos, setProductos] = React.useState<Producto[]>([]);
  const [tendencias, setTendencias] = React.useState<Producto[]>([]);
  const [ofertas, setOfertas] = React.useState<Producto[]>([]);

  useEffect(() => {
    const tipoProducto = "Consola";

    const FetchData = async () => {
      try {
        const [dataProductos, dataTendencias, dataOfertas] = await Promise.all([
          ApiPublic("obtenerProductosDesc", { tipoProducto }),
          ApiPublic("obtenerProductosTendencias", { tipoProducto }),
          ApiPublic("obtenerProductosOfertas", { tipoProducto }),
        ]);

        setProductos(dataProductos || []);
        setTendencias(dataTendencias || []);
        setOfertas(dataOfertas || []);
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
            precio={1800000}
            descuento={2000000}
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
                  {producto.descuentoProducto != 0 && (
                    <Descuento
                      consola="default"
                      precio={producto.descuentoProducto}
                    />
                  )}

                  <Card
                    consola="default"
                    titulo={producto.nombreProducto}
                    precio={producto.totalProducto}
                    descuento={
                      producto.totalProducto === producto.precioProducto
                        ? undefined
                        : producto.precioProducto
                    }
                    imagen={producto.idProducto}
                  />
                </Link>
              ))}
            </ProductosCards>
          </BodyCard>
          <BodyCard>
            <h2 className="Titulos">Tendencias</h2>
            <ProductosCards>
              {tendencias.map((tendencia) => (
                <Link
                  className="linkCards"
                  key={tendencia.idProducto}
                  to="/DetallesConsola"
                >
                     {tendencia.descuentoProducto != 0 && (
                    <Descuento
                      consola="default"
                      precio={tendencia.descuentoProducto}
                    />
                  )}

                  <Card
                    consola="default"
                    titulo={tendencia.nombreProducto}
                    precio={tendencia.totalProducto}
                    descuento={
                      tendencia.totalProducto === tendencia.precioProducto
                        ? undefined
                        : tendencia.precioProducto
                    }
                    imagen={tendencia.idProducto}
                  />
                </Link>
              ))}
            </ProductosCards>
          </BodyCard>

          <BodyCard>
            <h2 className="Titulos">Las ofertas de la semana</h2>
            <ProductosCards>
              {ofertas.map((oferta) => (
                <Link
                  className="linkCards"
                  key={oferta.idProducto}
                  to="/DetallesConsola"
                >
               {oferta.descuentoProducto != 0 && (
                    <Descuento
                      consola="default"
                      precio={oferta.descuentoProducto}
                    />
                  )}

                  <Card
                    consola="default"
                    titulo={oferta.nombreProducto}
                    precio={oferta.totalProducto}
                    descuento={
                      oferta.totalProducto === oferta.precioProducto
                        ? undefined
                        : oferta.precioProducto
                    }
                    imagen={oferta.idProducto}
                  />
                </Link>
              ))}
            </ProductosCards>
          </BodyCard>
        </Tienda>
      </main>
    </React.Fragment>
  );
}

export default Consolas;
