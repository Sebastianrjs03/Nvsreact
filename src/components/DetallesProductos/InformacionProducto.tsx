import React from "react";
import "../../styles/DetallesProducto/informacionProducto.css";

type Props = {
  children: React.ReactNode;
};


function InformacionProducto({ children }: Props,  ) {
  return (
    <section className="detallesProducto-infoProducto">
      {children}

    
    </section>
  );
}

export default InformacionProducto;
