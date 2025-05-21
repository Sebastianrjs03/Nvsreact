import React, { useEffect, useState } from "react";
import "../../styles/pages/detallesConsola.css";
import Menu from "../../components/Tienda/Menu";
import InformacionProducto from "../../components/DetallesProductos/InformacionProducto";
import DatosProducto from "../../components/DetallesProductos/datosProducto";
import DescripcionProducto from "../../components/DetallesProductos/descripcionProducto";
import CalificacionesProducto from "../../components/DetallesProductos/calificacionesProducto";
import ImagenVideojuego from "../../components/DetallesProductos/ImagenVideoJuego";
import GaleriaVideoJuego from "../../components/DetallesProductos/galeriaVideoJuego";
import { useParams } from "react-router-dom";
import { ApiPublic } from "../../hooks/UseFetch";

interface Detalle {
  idProducto: string;
  precioProducto: number;
  nombreProducto: string;
  descuentoProducto: string;
  totalProducto: number;
  anoLanzamineto: string;
  descripcionJuego: string;
  aux_genero: string;
  aux_plataforma: string;
}

function DetalleJuego() {
  const { id } = useParams();
  const [detalles, setDetalles] = useState<Detalle[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataDetalles = await ApiPublic("obtenerDetallesProducto", { id });
        setDetalles(dataDetalles || []);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <React.Fragment>
      <Menu />
      {detalles.map((detalle) => (
        <main className="detallesConsola-main">
          <InformacionProducto>
            <ImagenVideojuego imagen={detalle.idProducto} />

            <DatosProducto
              titulo={detalle.nombreProducto}
              marca={detalle.aux_plataforma}
              descuento={detalle.descuentoProducto}
              precio={detalle.totalProducto}
              tipoProducto="videojuego"
            />
          </InformacionProducto>

          <DescripcionProducto
            descripcion={detalle.descripcionJuego}
            añoLanzamiento={detalle.anoLanzamineto}
            generos={detalle.aux_genero}
            tipoProducto="videojuego"
          />

          <GaleriaVideoJuego
            visuales={detalle.idProducto}
          />

          <CalificacionesProducto />
        </main>
      ))}
    </React.Fragment>
  );
}

export default DetalleJuego;
