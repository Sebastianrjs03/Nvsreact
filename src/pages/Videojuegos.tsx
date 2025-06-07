import React, { useEffect, useState } from "react";
import Menu from "../components/Tienda/Menu";
import Tienda from "../components/Tienda/Tienda";
import Banner from "../components/Tienda/Banner";
import BodyCard from "../components/Tienda/BodyCards";
import ProductosCards from "../components/Tienda/ProductosCards";
import Card from "../components/Tienda/Card";
import Descuento from "../components/Tienda/Descuento.tsx";
import CategotiasContenedor from "../components/Tienda/CategoriasContenedor";
import Categorias from "../components/Tienda/CategoriasComponent.tsx";
import { ApiPublic } from "../hooks/UseFetch.tsx";
import { Link } from "react-router-dom";
import FooterPQRS from "../components/Tienda/FooterPQRS";
import "../styles/pages/Videojuegos.css";
import "../styles/Tienda/Link.css";

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

export function Videojuegos() {
  // estados de los productos que traigo de la api
  const [productos, setProductos] = useState<Producto[]>([]);
  const [tendencias, setTendencias] = useState<Producto[]>([]);
  const [ofertas, setOfertas] = useState<Producto[]>([]);
  const [generosJuegos, setGenerosJuegos] = useState<GeneroJuegos[]>([]);

  // useEffect para renderizar junto con el componente
  useEffect(() => {
    // Definimos el tipo de producto que queremos obtener
    const tipoProducto = "Videojuego";
    const generosJuegos = "1";

    // Función asíncrona para llamar la API
    const fetchData = async () => {
      try {
        // Llamamos a ApiPublic enviando el parámetro como objeto
        // y guardamos los resultados en variables (se ejecutan varias promises al mismo tiempo y se espera a que todas terminen)
        const [dataVendidos, dataTendencias, dataOfertas, dataGenerosJuegos] =
          await Promise.all([
            ApiPublic("obtenerProductosDesc", { tipoProducto }),
            ApiPublic("obtenerProductosTendencias", { tipoProducto }),
            ApiPublic("obtenerProductosOfertas", { tipoProducto }),
            ApiPublic("obtenerProductosDesc", { tipoProducto, generosJuegos }),
          ]);

        // Guardamos los datos recibidos en el estado
        setProductos(dataVendidos || []);
        setTendencias(dataTendencias || []);
        setOfertas(dataOfertas || []);
        setGenerosJuegos(dataGenerosJuegos || []);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };

    fetchData();
  }, []);

  const primerProducto = tendencias[0];
  const precioTotal = primerProducto?.totalProducto;
  const precio = primerProducto?.precioProducto;

  const descuento = precioTotal === precio ? undefined : precio;

  return (
    <React.Fragment>
      <Menu />
      <main className="videojuegos-main">
        <Tienda>
          <Banner
            Imagen={primerProducto?.idProducto}
            Titulo={primerProducto?.nombreProducto}
            Recorte="Default"
            precio={precioTotal}
            descuento={descuento}
          />
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
              {tendencias.map((tendencias) => (
                <Link
                  to={`/DetallesVideoJuego/${tendencias.idProducto}`}
                  className="linkCards"
                  key={tendencias.idProducto}
                >
                  {tendencias.descuentoProducto != 0 && (
                    <Descuento
                      consola="default"
                      precio={tendencias.descuentoProducto}
                    />
                  )}
                  <Card
                    consola="default"
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
            <h2 className="Titulos">Las Mejores Ofertas</h2>
            <ProductosCards>
              {ofertas.map((ofertas) => (
                <Link
                  to={`/DetallesVideoJuego/${ofertas.idProducto}`}
                  className="linkCards"
                  key={ofertas.idProducto}
                >
                  {ofertas.descuentoProducto != 0 && (
                    <Descuento
                      consola="default"
                      precio={ofertas.descuentoProducto}
                    />
                  )}
                  <Card
                    consola="default"
                    titulo={ofertas.nombreProducto}
                    precio={ofertas.totalProducto}
                    descuento={
                      ofertas.totalProducto === ofertas.precioProducto
                        ? undefined
                        : ofertas.precioProducto
                    }
                    imagen={ofertas.idProducto}
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
                  to={`/Categorias/${genero.idGeneroJuego}`}
                  className="linkCardsGeneros"
                  key={genero.idGeneroJuego}
                >
                  <Categorias
                    consola="Default"
                    titulo={genero.idGeneroJuego}
                  ></Categorias>
                </Link>
              ))}
            </CategotiasContenedor>
          </BodyCard>
        </Tienda>
      </main>
      <FooterPQRS/>
    </React.Fragment>
  );
}

export default Videojuegos;
