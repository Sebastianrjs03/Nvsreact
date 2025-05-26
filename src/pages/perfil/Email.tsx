import React from "react";
import "../../styles/Perfil/Datos.css";
import FormEditar from "../../components/Editar/formEditar";

function Email() {
  return (
    <React.Fragment>
      <section className="Datos-container">
        <h2>Cambiar Email</h2>
        <FormEditar tipoBotones="email" placeholder1="Nuevo Email" name1="emailNuevo" placeholder2="Confirmar Email" name2="confirmarEmail" />
      </section>
    </React.Fragment>
  );
}

export default Email;
