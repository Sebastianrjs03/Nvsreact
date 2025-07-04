import { useState, ChangeEvent } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import { ApiPrivate } from "../../../hooks/UseFetch.tsx";
import Logo from "../../../components/login/logo";
import { Link } from "react-router-dom";

type LoginResponse = {
  mensaje: string;
  token: string;
  usuario: {
    idUsuario: string;
    nombreUsuario: string;
    senombreUsuario?: string;
    apellidoUsuario: string;
    seapellidoUsuario?: string;
    correoUsuario: string;
    celularUsuario: string;
    direccion: string;
  };
};

type MiPayloadJWT = {
  id: string;
  rol: string;
  exp: number;
};

// Tipo genérico para manejar errores o respuestas exitosas
type ApiResponse<T> =
  | T
  | {
      error: true;
      status: number;
      mensaje: string;
    };

const LoginForm = () => {
  const [correo, setCorreo] = useState<string>("");
  const [contrasena, setContrasena] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const res: ApiResponse<LoginResponse> = await ApiPrivate("login", {
      correo,
      contrasena,
    });

    if ("error" in res) {
      await Swal.fire({
        title: "Contraseña o Correo incorrecto",
        text: "Verifica tu Contraseña o Correo Eléctronico",
        icon: "error",
        background: "#2a0054",
        color: "#ffffff",
        iconColor: "#red",
        confirmButtonColor: "#7e4efc",
      });
      return;
    }

    const token = res.token;

    if (token) {
      localStorage.setItem("token", token);
       const decoded = jwtDecode<MiPayloadJWT>(token);

      localStorage.setItem("rol", decoded.rol);
      localStorage.setItem("usuario", JSON.stringify(res.usuario));

      await Swal.fire({
        icon: "success",
        title: `¡Bienvenido ${res.usuario.nombreUsuario}!`,
        text: res.mensaje,
        color: "#ffffff",
        background: "#2a0054",
        iconColor: "#00a135",
        confirmButtonColor: "#7e4efc",
      });


      if (decoded.rol === "2") {
        navigate("/Administrador/Usuarios");
      } else {
        navigate("/");
      }
    }
  };

  return (
    <div className="login-container-form">
      <Logo />
      <form>
        <input
          type="email"
          placeholder="Email"
          name="mail"
          id="mail"
          value={correo}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setCorreo(e.target.value)
          }
        />
        <input
          type="password"
          placeholder="Contraseña"
          name="contrasena"
          id="contrasena"
          value={contrasena}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setContrasena(e.target.value)
          }
        />
      </form>

      <button onClick={handleSubmit} className="buttom">
        Entrar
      </button>
      <Link to={"/"} className="buttom2">
        Cancelar
      </Link>
      <Link className="a1" to={"/registro"}>
        Registrarse
      </Link>
      <Link to={"/RecuperarContrasena"} target="_blank" rel="noreferrer">
        Olvide mi contraseña
      </Link>
    </div>
  );
};

export default LoginForm;
