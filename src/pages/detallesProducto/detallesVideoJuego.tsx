import React, { useEffect, useState } from "react";
import "../../styles/pages/detallesConsola.css";
import Menu from "../../components/Tienda/Menu";
import InformacionProducto from "../../components/DetallesProductos/InformacionProducto";
import DatosProducto from "../../components/DetallesProductos/datosProducto";
import DescripcionProducto from "../../components/DetallesProductos/descripcionProducto";
import ImagenVideojuego from "../../components/DetallesProductos/ImagenVideoJuego";
import GaleriaVideoJuego from "../../components/DetallesProductos/galeriaVideoJuego";
import BannerProducto from "../../components/DetallesProductos/bannerProducto";
import { useParams } from "react-router-dom";
import { ApiPublic } from "../../hooks/UseFetch";
import Swal from "sweetalert2";
import FooterPQRS from "../../components/Tienda/footerPQRS";

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

  function agregarAlCarrito(idProducto: string | number) {
    const id = Number(idProducto);

    const ids: number[] = JSON.parse(
      localStorage.getItem("ids") || "[]"
    ).filter((item: any) => typeof item === "number");

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
      <BannerProducto Imagen={id!} Recorte="Default" />

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
              onAgregarAlCarrito={() => agregarAlCarrito(detalle.idProducto)}
            />
          </InformacionProducto>

          <DescripcionProducto
            descripcion={detalle.descripcionJuego}
            añoLanzamiento={detalle.anoLanzamineto}
            generos={detalle.aux_genero}
            tipoProducto="videojuego"
          />

          <GaleriaVideoJuego />
        </main>
      ))}
      <FooterPQRS />
    </React.Fragment>
  );
}

export default DetalleJuego;
