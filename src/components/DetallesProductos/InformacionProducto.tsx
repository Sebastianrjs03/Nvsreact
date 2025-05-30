import React from "react";
import "../../styles/DetallesProducto/informacionProducto.css";

type Props = {
  children: React.ReactNode;
  esConsola?: boolean;
};

function InformacionProducto({ children, esConsola = false }: Props) {
  const clase = esConsola
    ? "detallesProducto-infoProducto consola"
    : "detallesProducto-infoProducto";

  return <section className={clase}>{children}</section>;
}

export default InformacionProducto;
