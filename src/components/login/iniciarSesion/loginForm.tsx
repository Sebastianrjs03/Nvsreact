import React from "react";
import Logo from "../../../components/login/logo";
import { Link } from "react-router-dom";

const LoginForm = () => {
  return (
    <div className="container-form">
      <Logo/>
      <form>
        <input
          type="email"
          placeholder="Email"
          name="mail"
          id="mail"
        />
        <input
          type="password"
          placeholder="Contraseña"
          name="contrasena"
          id="contrasena"
        />
      </form>

      <button type="submit" className="buttom">
        Entrar
      </button>
      <a href="/index.html" className="buttom2">Cancelar</a>
      <Link className="a1" to={"/registro"}>Registrarse</Link>
      <Link
        to={"/RecuperarContrasena"}
        target="_blank"
        rel="noreferrer"
      >
        Olvide mi contraseña
      </Link>
    </div>
  );
};

export default LoginForm;
