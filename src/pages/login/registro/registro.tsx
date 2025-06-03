import "../../../styles/login/registro/stylesRegistro.css"; // Asegúrate de tener la ruta correcta
import Logo from '../../../components/login/logo';
import Formulario from '../../../components/login/registro/Form';
import DecorativeFigure from '../../../components/login/figure';

const Registro = () => {
  return (
    <div className="registro-container">
      <main className="registro-container">
        <section>
          <div className="registro-container-form">
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
