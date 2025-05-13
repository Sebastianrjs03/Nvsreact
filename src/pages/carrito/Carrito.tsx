import React from "react";
import "../../styles/pages/Carrito.css"
import MenuCarrito from "../../components/Carrito/MenuCarrito"
import BodyCarrito from "../../components/Carrito/BodyCarrito"
import CartCarrito from "../../components/Carrito/CartCarrito"
import ResumenCarrito from "../../components/Carrito/ResumenCarrito"
import DetalleResumenCarrito from "../../components/Carrito/DetalleResumenCarrito"

export function Carrito() {
  return (

    <React.Fragment>

      <MenuCarrito />

      <main className="carrito-main">

        <BodyCarrito>

          <CartCarrito NombreProducto="EA FC 24"
            Consola="PlayStation5"
            Precio="200.000" />

        </BodyCarrito>

        <ResumenCarrito>

          <DetalleResumenCarrito Total="" Detalle="EA FC 24" Precio="200.000"/>
          <DetalleResumenCarrito Total="total"  Detalle="SubTotal" Precio="200.000"/>

        </ResumenCarrito>

      </main>

    </React.Fragment>

  );
}

export default Carrito;
