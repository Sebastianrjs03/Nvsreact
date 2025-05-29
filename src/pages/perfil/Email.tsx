import React from "react";
import "../../styles/Perfil/Datos.css";
import FormEditar from "../../components/Editar/FormEditar";



function Email() {
  return (
    <React.Fragment>
      <section className="Datos-container">
        <h2>Cambiar Email</h2>
        <FormEditar
          tipoBotones="email"
          placeholder1="Nuevo Email *"
          name1="email"
          placeholder2="Confirmar Email *"
          name2="confirmarEmail"
          dato="Correo"
        />
      </section>
    </React.Fragment>
  );
}

export default Email;
