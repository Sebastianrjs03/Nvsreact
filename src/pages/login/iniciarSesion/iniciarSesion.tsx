
import React from "react";
import "../../../styles/login/iniciarSesion/stylesLogin.css"; 
import LoginForm from "../../../components/login/iniciarSesion/loginForm";
import DecorativeFigure from "../../../components/login/figure"

const Login = () => {
  return (
    <div className="container">
      <main className="container">
        <section>
          <LoginForm />
        </section>
        <DecorativeFigure />
      </main>
    </div>
  );
};

export default Login;

