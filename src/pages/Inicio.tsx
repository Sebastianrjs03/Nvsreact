import React, { useEffect, useState } from "react";
import Menu from "../components/Tienda/Menu";
import Promociones from '../components/Tienda/Promociones';
import Carrusel from "../components/Tienda/Carrusel";
import Tienda from '../components/Tienda/Tienda'
import Banner from '../components/Tienda/Banner';
import BodyCard from "../components/Tienda/BodyCards";
import ProductosCards from "../components/Tienda/ProductosCards";
import Card from '../components/Tienda/Card'
import { Link } from 'react-router-dom';


import '../styles/Tienda/Link.css';
import '../styles/pages/Inicio.css';


interface Producto {
  idProducto: string;
  nombreProducto: string;
  precioProducto: number;
}

export function Inicio() {
  
  const [tendencias, setTendencias] = useState<Producto[]>([]);
  const [ofertas, setOfertas] = useState<Producto[]>([]);
  
    useEffect(() => {
      const tipoProducto = "Videojuego";
  
      const urls = [
        `http://localhost/api-php?ruta=obtenerProductosTendencias&tipoProducto=${tipoProducto}`,
        `http://localhost/api-php?ruta=obtenerProductosOfertas&tipoProducto=${tipoProducto}`
      ];
  
      Promise.all(urls.map(url => fetch(url).then(res => res.json())))
      .then(([ dataTendencias, dataVendidos]) => {
        setTendencias(dataTendencias);
        setOfertas(dataVendidos);
      })
      .catch((error) => {
        console.error("Error al obtener datos:", error);
      });
    }, []);

  return (

    <React.Fragment>
      <Menu />
      <main className="inicio-main">

        <Promociones Imagen="xbox" ImagenConsola="consolaXbox" consola="xbox" />
        <Promociones Imagen="play" ImagenConsola="consolaPlay" consola="play" />
        <Promociones Imagen="nintendo" ImagenConsola="consolaNintendo" consola="nintendo" />
        <Carrusel/>
        <Tienda>
          <Banner Imagen="MilesMorales" Titulo="Marvel´s Spider-Man: Miles Morales" Recorte="Morado"/>
          <BodyCard>
          <h2 className="Titulos">Tendencias</h2>
          <ProductosCards>
          {tendencias.map((tendencias) => (
            <Link  to={`/DetallesVideoJuego/${tendencias.idProducto}`} className="linkCards">
            <Card
              key={tendencias.idProducto}
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
            <Link  to={`/DetallesVideoJuego/${ofertas.idProducto}`} className="linkCards">
            <Card
              key={ofertas.idProducto}
              consola="default"
              titulo={ofertas.nombreProducto}
              precio={ofertas.precioProducto}
              imagen={ofertas.idProducto}
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

export default Inicio;