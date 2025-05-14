import React from "react";
import "../../styles/pages/detallesConsola.css"
import Menu from "../../components/Tienda/Menu";
import InformacionProducto from "../../components/DetallesProductos/InformacionProducto";
import DatosProducto from "../../components/DetallesProductos/datosProducto";
import DescripcionProducto from "../../components/DetallesProductos/descripcionProducto";
import CalificacionesProducto from "../../components/DetallesProductos/calificacionesProducto";
import ImagenVideojuego from "../../components/DetallesProductos/ImagenVideoJuego";
import GaleriaVideoJuego from "../../components/DetallesProductos/galeriaVideoJuego";



function DetalleConsola() {
  return (

    <React.Fragment>

      <Menu/>

      <main className="detallesConsola-main">
        

        <InformacionProducto>

          <ImagenVideojuego/>

          <DatosProducto titulo="Consola Sony Playstation 5 Slim Version Lector Disco" marca="playStation" precio="2.000.000"/>

        </InformacionProducto>
        
        <DescripcionProducto/>

        <GaleriaVideoJuego/>

        <CalificacionesProducto/>
  

      </main>

    </React.Fragment>

  );
}

export default DetalleConsola;
