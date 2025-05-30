import React from "react";
import "../../styles/Perfil/Datos.css";
import FormEditarPersonales from "../../components/Editar/FormEditarPersonales";


function Nombres() {
     const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");
  return (
    <React.Fragment>
      <section className="Datos-container">
        <h2>Cambiar Datos Personales</h2>
        <FormEditarPersonales
        value1={usuario?.nombreUsuario || ""}
        value2={usuario?.senombreUsuario || ""}
        value3={usuario?.apellidoUsuario || ""}
        value4={usuario?.seapellidoUsuario || ""}
        value5={usuario?.celularUsuario || ""}
        
        />
      </section>
    </React.Fragment>
  );
}

export default Nombres;
