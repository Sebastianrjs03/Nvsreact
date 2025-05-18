import React, { useEffect, useState } from "react";
import Menu from "../components/Tienda/Menu";
import Tienda from "../components/Tienda/Tienda";
import Banner from "../components/Tienda/Banner";
import BodyCard from "../components/Tienda/BodyCards";
import ProductosCards from "../components/Tienda/ProductosCards";
import Card from "../components/Tienda/Card";
import CategotiasContenedor from "../components/Tienda/CategoriasContenedor";
import Categorias from "../components/Tienda/Categorias";
import { ApiPublic } from "../hooks/UseFetch.tsx";
import { Link } from "react-router-dom";

import "../styles/pages/Videojuegos.css";
import "../styles/Tienda/Link.css";

interface Producto {
  idProducto: string;
  nombreProducto: string;
  precioProducto: number;
};

interface GeneroJuegos {
  idGeneroJuego: string;
  estadoGeneroJuego: string;
}

export function Videojuegos() {

  // estados de los productos que traigo de la api
  const [productos, setProductos] = useState<Producto[]>([]);
  const [tendencias, setTendencias] = useState<Producto[]>([]);
  const [ofertas, setOfertas] = useState<Producto[]>([]);
  const [generos, setGeneros] = useState<GeneroJuegos[]>([]);


  // useEffect para renderizar junto con el componente
  useEffect(() => {

    // Definimos el tipo de producto que queremos obtener
    const tipoProducto = "Videojuego";
    const categoria = "1";

    // Función asíncrona para llamar la API
    const fetchData = async () => {
      try {
        // Llamamos a ApiPublic enviando el parámetro como objeto
        // y guardamos los resultados en variables (se ejecutan varias promises al mismo tiempo y se espera a que todas terminen)
        const [dataVendidos, dataTendencias, dataOfertas, dataGeneros] = await Promise.all([
          ApiPublic("obtenerProductosDesc", { tipoProducto }),
          ApiPublic("obtenerProductosTendencias", { tipoProducto }),
          ApiPublic("obtenerProductosOfertas", { tipoProducto }),
          ApiPublic("obtenerProductosDesc", { tipoProducto, categoria })
        ]);

        // Guardamos los datos recibidos en el estado
        setProductos(dataVendidos || []);
        setTendencias(dataTendencias || []);
        setOfertas(dataOfertas || []);
        setGeneros(dataGeneros || []);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };

    fetchData();
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
                <Link
                  to={`/DetallesVideoJuego/${producto.idProducto}`}
                  className="linkCards"
                  key={producto.idProducto}
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
              {tendencias.map((tendencias) => (
                <Link
                  to={`/DetallesVideoJuego/${tendencias.idProducto}`}
                  className="linkCards"
                  key={tendencias.idProducto}
                >
                  <Card
                    consola="default"
                    titulo={tendencias.nombreProducto}
                    precio={tendencias.precioProducto}
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
                  <Card
                    consola="default"
                    titulo={ofertas.nombreProducto}
                    precio={ofertas.precioProducto}
                    imagen={ofertas.idProducto}
                  />
                </Link>
              ))}
            </ProductosCards>
          </BodyCard>
          <BodyCard>
            <h2 className="Titulos-disposicion">Filtra Por Tus preferencias</h2>
            <CategotiasContenedor>
              {generos.map((genero) => (
                <Link
                  to={`/DetallesVideoJuego/${genero.idGeneroJuego}`}
                  className="linkCards"
                  key={genero.idGeneroJuego}
                >
                  <Categorias consola="Default" titulo={genero.idGeneroJuego}></Categorias>
                </Link>
              ))}
            </CategotiasContenedor>
          </BodyCard>
        </Tienda>
      </main>
    </React.Fragment>
  );
}

export default Videojuegos;
