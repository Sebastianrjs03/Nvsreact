import React, { useEffect, useState } from "react";
import "../../styles/pages/detallesConsola.css"
import Menu from "../../components/Tienda/Menu";
import InformacionProducto from "../../components/DetallesProductos/InformacionProducto";
import ImagenesConsola from "../../components/DetallesProductos/imagenesConsola";
import DatosProducto from "../../components/DetallesProductos/datosProducto";
import DescripcionProducto from "../../components/DetallesProductos/descripcionProducto";
import TablaTecnicaConsola from "../../components/DetallesProductos/tablaTecnicaConsola";
import CalificacionesProducto from "../../components/DetallesProductos/calificacionesProducto";
import { useParams } from "react-router-dom";
import { ApiPublic } from "../../hooks/UseFetch";


interface Detalle {
  idProducto: string;
  precioProducto: number;
  nombreProducto: string;
  descuentoProducto: string;
  totalProducto: number;
  sobreConsola: string;
  color: string;
  tipoControles: string;
  controlesIncluidos: string;
  controlesSoporta: string;
  tipoProcesador: string;
  resolucion: string;
  fuenteAlimentacion: string;
  opcionConectividad: string;
  tipoPuertos: string;

}



function DetalleConsola() {
  const { id } = useParams();
  const [detalles, setDetalles] = useState<Detalle[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataDetalles = await ApiPublic("obtenerDetallesConsola", { id });
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

            <ImagenesConsola imgConsola={detalle.idProducto} />

            <DatosProducto
              titulo={detalle.nombreProducto}
              marca={detalle.color}
              descuento={detalle.descuentoProducto}
              precio={detalle.totalProducto}
              tipoProducto="consola"
            />

          </InformacionProducto>

          <DescripcionProducto
            descripcion={detalle.sobreConsola}
            añoLanzamiento={detalle.color}
            generos={detalle.color}
            tipoProducto="consola"
          />

          <TablaTecnicaConsola 
          colorConsola={detalle.color}
          tipoControles={detalle.tipoControles}
          controles={detalle.controlesIncluidos} 
          controlesSoporta={detalle.controlesSoporta} 
          procesador={detalle.tipoProcesador}
          resolucion={detalle.resolucion} 
          alimentacion={detalle.fuenteAlimentacion} 
          conectividad={detalle.opcionConectividad} 
          puertos={detalle.tipoPuertos} 
          />

          <CalificacionesProducto />



        </main>
      ))}
    </React.Fragment>

  );
}

export default DetalleConsola;
