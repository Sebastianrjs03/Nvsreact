import React from "react";
import "../../styles/pages/detallesConsola.css"
import Menu from "../../components/Tienda/Menu";
import InformacionProducto from "../../components/DetallesProductos/InformacionProducto";
import ImagenesConsola from "../../components/DetallesProductos/imagenesConsola";
import DatosProducto from "../../components/DetallesProductos/datosProducto";
import DescripcionProducto from "../../components/DetallesProductos/descripcionProducto";
import TablaTecnicaConsola from "../../components/DetallesProductos/tablaTecnicaConsola";
import CalificacionesProducto from "../../components/DetallesProductos/calificacionesProducto";



function DetalleConsola() {
  return (

    <React.Fragment>

      <Menu/>

      <main className="detallesConsola-main">

        <InformacionProducto>

          <ImagenesConsola/>

          <DatosProducto titulo="Consola Sony Playstation 5 Slim Version Lector Disco" marca="playStation" precio="2.000.000"/>

        </InformacionProducto>

        <DescripcionProducto/>

        <TablaTecnicaConsola/>

        <CalificacionesProducto/>

        

      </main>

    </React.Fragment>

  );
}

export default DetalleConsola;
