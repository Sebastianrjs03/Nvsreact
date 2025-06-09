import React, { useEffect, useState } from "react";
import "../../styles/pages/Pagos.css";
import MenuPagos from "../../components/Pagos/MenuPagos";
import BodyPagos from "../../components/Pagos/BodyPagos";
import ResumenCarrito from "../../components/Carrito/ResumenCarrito";
import DetalleResumenCarrito from "../../components/Carrito/DetalleResumenCarrito";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

interface ProductoResumen {
  nombre: string;
  cantidad: number;
  precioUnitario: number;
  total: number;
}
// const resumenString = JSON.parse(localStorage.getItem("resumenPago") || "{}");
// console.log("Resumen del pago:", resumenString);

function Pagos() {
  const [productos, setProductos] = useState<ProductoResumen[]>([]);
  const [subtotal, setSubtotal] = useState(0);
  const [envio, setEnvio] = useState(30000); // Si el envío es fijo
  const [iva, setIva] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const data = localStorage.getItem("resumenPago");
    if (data) {
      const parsed = JSON.parse(data);
      setProductos(parsed.productos || []);
      setEnvio(parsed.envio || 30000);
      setSubtotal(parsed.subtotal || 0);
      setIva(parsed.iva || 0);
      setTotal(parsed.total || 0);
    }
  }, []);

  return (
    <React.Fragment>
      <MenuPagos />
      <main className="pagos-main">
        <PayPalScriptProvider
          options={{
            clientId:
              "AZNhejtlin07MRXowLNYI-JiF_jDQlhRd1A8LZ5pfnvaKYMwxeZAL-jdDOuMWgdzmG6kv1wk9CDYh5vz",
            currency: "USD",
          }}
        >
          <BodyPagos total={total} />
        </PayPalScriptProvider>

        <ResumenCarrito>
          {productos.map((prod, idx) => (
            <DetalleResumenCarrito
              key={idx}
              Detalle={`${prod.nombre} x(${prod.cantidad})`}
              Precio={prod.total.toString()}
              Total=""
            />
          ))}
          <DetalleResumenCarrito
            Detalle="Subtotal"
            Precio={subtotal.toFixed(0)}
            Total=""
          />
          <DetalleResumenCarrito
            Detalle="IVA (19%)"
            Precio={iva.toFixed(0)}
            Total=""
          />
          <DetalleResumenCarrito
            Detalle="Envio"
            Precio={envio.toFixed(0)}
            Total=""
          />
          <DetalleResumenCarrito
            Detalle="Total a pagar"
            Precio={total.toFixed(0)}
            Total="total"
          />
        </ResumenCarrito>
      </main>
    </React.Fragment>
  );
}

export default Pagos;
