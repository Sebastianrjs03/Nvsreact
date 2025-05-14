import React from "react";
import "../../styles/pages/Pagos.css"
import MenuPagos from "../../components/Pagos/MenuPagos"
import BodyPagos from "../../components/Pagos/BodyPagos"
import ResumenCarrito from "../../components/Carrito/ResumenCarrito"
import DetalleResumenCarrito from "../../components/Carrito/DetalleResumenCarrito"

function Pagos() {
  return (  

    <React.Fragment>

      <MenuPagos />

      <main className="pagos-main">

        <BodyPagos/>

        <ResumenCarrito>

          <DetalleResumenCarrito Total="" Detalle="EA FC 24" Precio="200.000"/>
          <DetalleResumenCarrito Total="total"  Detalle="Total" Precio="200.000"/>

        </ResumenCarrito>

      </main>

    </React.Fragment>

  );
}

export default Pagos;
