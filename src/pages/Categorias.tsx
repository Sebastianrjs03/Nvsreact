import React, { useEffect, useState } from "react";
import Menu from "../components/Tienda/Menu";
import Tienda from "../components/Tienda/Tienda";
import Banner from "../components/Tienda/Banner";
import BodyCard from "../components/Tienda/BodyCards";
import ProductosCards from "../components/Tienda/ProductosCards";
import Card from '../components/Tienda/Card';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import "../styles/pages/CategoriasMain.css";
import "../styles/Tienda/Link.css";
import { ApiPublic } from "../hooks/UseFetch";

interface Producto {
  idProducto: string;
  precioProducto: number;
  totalProducto: number;
  nombreProducto: string;
}

export function Categorias() {
  const {id, idPlataforma} = useParams();
  const plataforma = idPlataforma;
  const genero = id;
  const tipoProducto = "Videojuego";
  
  const [productos, setProductos] = useState<Producto[]>([]);

  useEffect(() => {

    const dataToSend: any = {
  tipoProducto,
  genero
};

if (plataforma) {
  dataToSend.plataforma = plataforma;
}

      const fetchData = async () => {
        try {
          const dataProductos = await ApiPublic("obtenerProductosDesc", dataToSend);
          setProductos(dataProductos || []);
        }catch (error) {
          console.error("Error al obtener datos:", error);
        }
      }
      fetchData();
  }, [genero, plataforma]);

  const primerProducto = productos[0];
  const precioTotal = primerProducto?.totalProducto;
  const precio = primerProducto?.precioProducto;

 const descuento = precioTotal === precio ? undefined : precio;

 let recorte;
 let CardColor;

  switch (plataforma) {
    case "Xbox":
      recorte = "Xbox";
      CardColor = "xbox";
      break;
    case "PlayStation":
      recorte = "Playstation";
      CardColor = "play";
      break;
    case "Nintendo":
      recorte = "Nintendo";
      CardColor = "nintendo";
      break;
    default:
      recorte = "Default";
      CardColor = "default";
      break;
  }

  const mainColor = `${recorte}Categorias`

  return (
    <React.Fragment>
      <Menu />
      <main className={mainColor}>
        <Tienda>
          <Banner
            Imagen= {primerProducto?.idProducto}
            Titulo={primerProducto?.nombreProducto}
            Recorte={recorte}
            precio={precioTotal}
            descuento={descuento}
          />
          <BodyCard>
            <h2 className="Titulos">Lo mejor en {id}</h2>

            <ProductosCards>
              {productos.map((producto) => (
                <Link
                  to={`/DetallesVideoJuego/${producto.idProducto}`}
                  className="linkCards"
                >
                  <Card
                    key={producto.idProducto}
                    consola={CardColor}
                    titulo={producto.nombreProducto}
                    precio={producto.precioProducto}
                    imagen={producto.idProducto}
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

export default Categorias;
