import React from "react";
import "../../styles/Perfil/Datos.css";
import FormEditar from "../../components/Editar/FormEditar";

function Direccion() {
  return (
    <React.Fragment>
      <section className="Datos-container">
        <h2>Cambiar Dirección</h2>
        <FormEditar
          tipoBotones="email"
          placeholder1="Nueva Direccion *"
          name1="direccion"
          placeholder2="Complemento"
          name2="complemento"
          dato="Dirección"
        />
      </section>
    </React.Fragment>
  );
}

export default Direccion;
