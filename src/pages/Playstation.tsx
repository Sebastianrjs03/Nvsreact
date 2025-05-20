import React, { useEffect, useState } from "react";
import Menu from "../components/Tienda/Menu";
import Tienda from "../components/Tienda/Tienda";
import Banner from "../components/Tienda/Banner";
import BodyCard from "../components/Tienda/BodyCards";
import ProductosCards from "../components/Tienda/ProductosCards";
import Card from "../components/Tienda/Card";
import CategotiasContenedor from "../components/Tienda/CategoriasContenedor";
import Categorias from "../components/Tienda/CategoriasComponent";
import Descuento from "../components/Tienda/Descuento";
import "../styles/pages/Playstation.css";
import "../styles/Tienda/Link.css";
import { Link } from "react-router-dom";

interface Producto {
  idProducto: string;
  totalProducto: number;
  precioProducto: number;
  nombreProducto: string;
  descuentoProducto: number;
}

interface GeneroJuegos {
  idGeneroJuego: string;
  estadoGeneroJuego: string;
}

export function Playstation() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [tendencias, setTendencias] = useState<Producto[]>([]);
  const [exclusivos, setExclusivos] = useState<Producto[]>([]);
  const [generosJuegos, setGenerosJuegos] = useState<GeneroJuegos[]>([]);

  useEffect(() => {
    const tipoProducto = "Videojuego";
    const plataforma = "Playstation";

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
      <main className="playstation-main">
        <Tienda>
          <Banner
            Imagen={primerProducto?.idProducto}
            Titulo={primerProducto?.nombreProducto}
            Recorte="Playstation"
            precio={precioTotal}
            descuento={descuento}
          />
          <BodyCard>
            <BodyCard>
              <h2 className="Titulos">Lo más vendido</h2>
              <ProductosCards>
                {productos.map((producto) => (
                  <Link
                    to={`/DetallesVideoJuego/${producto.idProducto}`}
                    className="linkCards"
                    key={producto.idProducto}
                  >
                    {producto.descuentoProducto != 0 && (
                      <Descuento
                        consola="play"
                        precio={producto.descuentoProducto}
                      />
                    )}

                    <Card
                      consola="play"
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
            <h2 className="Titulos">Tendencias</h2>
            <ProductosCards>
              {tendencias.map((tendencias) => (
                <Link
                  to={`/DetallesVideoJuego/${tendencias.idProducto}`}
                  className="linkCards"
                  key={tendencias.idProducto}
                >
                  {tendencias.descuentoProducto != 0 && (
                    <Descuento
                      consola="play"
                      precio={tendencias.descuentoProducto}
                    />
                  )}

                  <Card
                    consola="play"
                    titulo={tendencias.nombreProducto}
                    precio={tendencias.totalProducto}
                    descuento={
                      tendencias.totalProducto === tendencias.precioProducto
                        ? undefined
                        : tendencias.precioProducto
                    }
                    imagen={tendencias.idProducto}
                  />
                </Link>
              ))}
            </ProductosCards>
          </BodyCard>

          <BodyCard>
            <h2 className="Titulos">Exclusivos de Playstation</h2>
            <ProductosCards>
              {exclusivos.map((exclusivos) => (
                  <Link
                    to={`/DetallesVideoJuego/${exclusivos.idProducto}`}
                    className="linkCards"
                    key={exclusivos.idProducto}
                  >
                    {exclusivos.descuentoProducto != 0 && (
                      <Descuento
                        consola="play"
                        precio={exclusivos.descuentoProducto}
                      />
                    )}

                    <Card
                      consola="play"
                      titulo={exclusivos .nombreProducto}
                      precio={exclusivos .totalProducto}
                      descuento={exclusivos.totalProducto === exclusivos.precioProducto? undefined: exclusivos.precioProducto
                      }
                      imagen={exclusivos .idProducto}
                    />
                  </Link>
              ))}
            </ProductosCards>
          </BodyCard>
          <BodyCard>
            <h2 className="Titulos-disposicion">Filtra Por Tus preferencias</h2>
            <CategotiasContenedor>
              {generosJuegos.map((genero) => (
                <Link
                  to={`/Categorias/${genero.idGeneroJuego}/PlayStation`}
                  className="linkCardsGeneros"
                  key={genero.idGeneroJuego}
                >
                  <Categorias
                    consola="play"
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

export default Playstation;
