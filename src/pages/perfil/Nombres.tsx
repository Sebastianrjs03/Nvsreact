import React from "react";
import "../../styles/Perfil/Datos.css";
import { jwtDecode } from "jwt-decode";
import FormEditarPersonales from "../../components/Editar/FormEditarPersonales";

interface MyJwtPayload {
  correo: string;
  nombre: string;
  segundoNombre: string;
  apellido: string;
  segundoApellido: string;
  celular: string;
}

function Nombres() {
     const token = localStorage.getItem("token");
    
      let decoded: MyJwtPayload | null = null;
    
      if (token) {
        decoded = jwtDecode<MyJwtPayload>(token);
      }
    
  return (
    <React.Fragment>
      <section className="Datos-container">
        <h2>Cambiar Datos Personales</h2>
        <FormEditarPersonales
        value1={decoded?.nombre || ""}
        value2={decoded?.segundoNombre || ""}
        value3={decoded?.apellido || ""}
        value4={decoded?.segundoApellido || ""}
        value5={decoded?.celular || ""}
        
        />
      </section>
    </React.Fragment>
  );
}

export default Nombres;
