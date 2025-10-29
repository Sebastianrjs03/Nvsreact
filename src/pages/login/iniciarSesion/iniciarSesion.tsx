import "../../../styles/login/iniciarSesion/stylesLogin.css"; 
import LoginForm from "../../../components/login/iniciarSesion/loginForm";
import DecorativeFigure from "../../../components/login/figure"
import Menu from "../../../components/Tienda/Menu";

const Login = () => {
  return (
    <div className="login-container">
      <main className="login-container">
        <Menu />
        <section>
          <LoginForm />
        </section>
        <DecorativeFigure />
      </main>
    </div>
  );
};

export default Login;

