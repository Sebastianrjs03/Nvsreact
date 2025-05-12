import React from 'react';
import "../../../styles/login/registro/stylesRegistro.css"; // Asegúrate de tener la ruta correcta
import Logo from '../../../components/login/logo';
import Formulario from '../../../components/login/registro/Form';
import DecorativeFigure from '../../../components/login/figure';

const Registro = () => {
  return (
    <div className="container">
      <main className="container">
        <section>
          <div className="container-form">
            <Logo />
            <Formulario />
          </div>
        </section>
        <DecorativeFigure />
      </main>
    </div>
  );
};

export default Registro;
