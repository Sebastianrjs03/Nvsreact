import React from "react";
import "../../styles/Perfil/Datos.css";
import FormEditar from "../../components/Editar/FormEditar";

function Contrasena() {
  return (
    <React.Fragment>
      <section className="Datos-container">
        <h2>Cambiar Contraseña</h2>
        <FormEditar tipoBotones="password" placeholder1="Nueva Contraseña" name1="nuevaContrasela" placeholder2="Confirmar Contraseña" name2="confirmarEmail" />
      </section>
    </React.Fragment>
  );
}

export default Contrasena;
