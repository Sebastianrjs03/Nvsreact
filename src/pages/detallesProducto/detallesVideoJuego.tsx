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
  precioProducto: string;
  nombreProducto: string;
  descuentoProducto: string;
  totalProducto: string;
  anoLanzamineto: string;
  descripcionJuego: string;
  genero: string;
  plataforma: string;
}

function DetalleConsola() {
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
            <ImagenVideojuego />

            <DatosProducto
              titulo={detalle.nombreProducto}
              marca={detalle.plataforma}
              precio="2.000.000"
            />
          </InformacionProducto>

          <DescripcionProducto />

          <GaleriaVideoJuego />

          <CalificacionesProducto />
        </main>
      ))}
    </React.Fragment>
  );
}

export default DetalleConsola;
