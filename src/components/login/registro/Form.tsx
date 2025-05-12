import React from 'react';
import TermsAndConditions from './TermsAndConditions';
import SubmitButton from './SubmitButton';

const Formulario = () => {
  return (
    <form>
      <div className="container-buttom">
        <input type="text" placeholder="Nombre..." name="nombre" id="nombre" />
        <input type="text" placeholder="Apellido..." name="apellido" id="apellido" />
      </div>
      
      <div className="container-buttom">
        <input type="email" placeholder="Correo..." name="correo" id="correo" />
        <input type="number" placeholder="Número..." name="numero" id="numero" />
      </div>
      
      <div className="container-buttom">
        <input type="password" placeholder="Contraseña..." name="contrasena" id="contrasena" />
        <input type="password" placeholder="Confirmar Contraseña..." name="contrasena2" id="contrasena2" />
      </div>
      
      <div className="container2">
        <input type="text" placeholder="Dirección..." name="direccion" id="direccion" className="LongInput" />
        <input type="text" placeholder="Datos Adicionales de dirección..." name="datos" id="datos" className="LongInput" />
      </div>

      <TermsAndConditions />

      <SubmitButton />
    </form>
  );
};

export default Formulario;
