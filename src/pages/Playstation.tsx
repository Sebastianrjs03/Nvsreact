import React, {useEffect, useState} from "react";
import Menu from "../components/Tienda/Menu";
import Tienda from "../components/Tienda/Tienda";
import Banner from "../components/Tienda/Banner";
import BodyCard from "../components/Tienda/BodyCards";
import ProductosCards from "../components/Tienda/ProductosCards";
import Card from "../components/Tienda/Card";

import "../styles/pages/Playstation.css";

interface Producto {
  idProducto: string;
  nombreProducto: string;
  precioProducto: number;
}
 

export function Playstation() {

  const [productos, setProductos] = useState<Producto[]>([]);

  useEffect(() => {
    const tipoProducto = 'Videojuego';
    const plataforma = 'Playstation';
    const url =  `http://localhost/api-php?ruta=obtenerProductosDesc&tipoProducto=${tipoProducto}&plataforma=${plataforma}`;
    
    fetch (url)
    .then((res) => res.json())
    .then((data) =>{
      setProductos(data);
    })
    .catch((error) => console.error("Error al obtener los productos:", error));
  }, []);


  return (
    <React.Fragment>
      <Menu />
      <main className="playstation-main">
        <Tienda>
          <Banner
            Imagen="GodOfWar"
            Titulo="God Of War "
            Recorte="Playstation"
          />
          <BodyCard>
            <BodyCard>
              <h2 className="Titulos">Lo más vendido</h2>
              <ProductosCards>

                {productos.map((producto) => (

                <Card key={producto.idProducto}  consola="play" titulo={producto.nombreProducto} precio={producto.precioProducto} imagen={producto.idProducto}/>
                ))}
                
              </ProductosCards>
            </BodyCard>
            <h2 className="Titulos">Tendencias</h2>
            <ProductosCards>
              <Card consola="play" />
              <Card consola="play" />
              <Card consola="play" />
              <Card consola="play" />
              <Card consola="play" />
              <Card consola="play" />
              <Card consola="play" />
              <Card consola="play" />
              <Card consola="play" />
            </ProductosCards>
          </BodyCard>

          <BodyCard>
            <h2 className="Titulos">Exclusivos de Playstation</h2>
            <ProductosCards>
              <Card consola="play" />
              <Card consola="play" />
              <Card consola="play" />
            </ProductosCards>
          </BodyCard>
        </Tienda>
      </main>
    </React.Fragment>
  );
}

export default Playstation;
