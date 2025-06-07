import React, { useEffect, useState } from "react";
import "../../styles/pages/detallesConsola.css"
import Menu from "../../components/Tienda/Menu";
import InformacionProducto from "../../components/DetallesProductos/InformacionProducto";
import ImagenesConsola from "../../components/DetallesProductos/imagenesConsola";
import DatosProducto from "../../components/DetallesProductos/datosProducto";
import DescripcionProducto from "../../components/DetallesProductos/descripcionProducto";
import TablaTecnicaConsola from "../../components/DetallesProductos/tablaTecnicaConsola";
import FooterPQRS from "../../components/Tienda/FooterPQRS";
import { useParams } from "react-router-dom";
import { ApiPublic } from "../../hooks/UseFetch";
import Swal from "sweetalert2";

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


function agregarAlCarrito(idProducto: string | number) {
  const id = Number(idProducto);

  const ids: number[] = JSON.parse(localStorage.getItem("ids") || "[]")
    .filter((item: any) => typeof item === "number");

  if (!ids.includes(id)) {
    ids.push(id);
    localStorage.setItem("ids", JSON.stringify(ids));
    
    Swal.fire({
      title: "Agregado al carrito",
      text: "El producto ha sido añadido exitosamente.",
      icon: "success",
      background: "#2a0054",
      color: "#ffffff",
      iconColor: "#00a135",
      confirmButtonColor: "#7e4efc",
    });

  } else {
    Swal.fire({
      title: "Producto ya en el carrito",
      text: "Este producto ya está en tu carrito.",
      icon: "info",
      background: "#2a0054",
      color: "#ffffff",
      iconColor: "#facc15",
      confirmButtonColor: "#7e4efc",
    });
  }
}

  return (

    <React.Fragment>
      <Menu />

      {detalles.map((detalle) => (

        <main className="detallesConsola-main">

          <InformacionProducto esConsola>

            <ImagenesConsola imgConsola={detalle.idProducto} />

            <DatosProducto
              titulo={detalle.nombreProducto}
              marca={detalle.color}
              descuento={detalle.descuentoProducto}
              precio={detalle.totalProducto}
              tipoProducto="consola"
              onAgregarAlCarrito={() => agregarAlCarrito(detalle.idProducto)}
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



        </main>
        
      ))}

      <FooterPQRS/>

      
    </React.Fragment>



  );
}

export default DetalleConsola;
