import '../../../styles/login/recuperarContrasena/stylesRecuperarContrasena.css';  
import Logo from "../../../components/login/logo"
import DecorativeFigure from '../../../components/login/figure';
import Paragraph from '../../../components/login/recuperarContrasena/Paragraph';
import Form from '../../../components/login/recuperarContrasena/Form';

function RecuperarContrasena() {

    return (
        <div className="registro-container">
            <main className="registro-container">
                <section>
                    <div className="registro-container-form">
                        <Logo/>
                        <Paragraph/>
                        <Form/>
                    </div>
                </section>
                <DecorativeFigure/>
            </main>
        </div>
    );
}

export default RecuperarContrasena;
