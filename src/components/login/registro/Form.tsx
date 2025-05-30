import { Link } from "react-router-dom";
import { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { ApiPrivate } from "../../../hooks/UseFetch";
import Swal from "sweetalert2";

type ApiResponse = {
  status: number;
  mensaje?: string;
  error?: boolean;
  data?: any;
};

const Formulario = () => {
  const Navigate = useNavigate();

  const [nombre, setNombre] = useState<string>("");
  const [apellido, setApellido] = useState<string>("");
  const [segundoNombre, setSegundoNombre] = useState<string>("");
  const [segundoApellido, setSegundoApellido] = useState<string>("");
  const [celular, setCelular] = useState<string>("");
  const [correo, setCorreo] = useState<string>("");
  const [direccion, setDireccion] = useState<string>("");
  const [complemento, setComplemento] = useState<string>("");
  const [contrasena, setContrasena] = useState<string>("");
  const [confirmarContrasena, setConfirmarContrasena] = useState<string>("");

  const handleSubmit2 = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !nombre.trim() ||
      !apellido.trim() ||
      !correo.trim() ||
      !celular.trim() ||
      !contrasena.trim() ||
      !confirmarContrasena.trim() ||
      !direccion.trim()
    ) {
      await Swal.fire({
        title: "Campos incompletos",
        text: "Por favor, completa todos los campos obligatorios (*).",
        icon: "warning",
        background: "#2a0054",
        color: "#ffffff",
        iconColor: "#ffcc00",
        confirmButtonColor: "#7e4efc",
      });
      return;
    }

    if (contrasena !== confirmarContrasena) {
      await Swal.fire({
        title: "Contraseñas no coinciden",
        text: "Las contraseñas ingresadas no coinciden. Por favor, verifica.",
        icon: "warning",
        background: "#2a0054",
        color: "#ffffff",
        iconColor: "#ffcc00",
        confirmButtonColor: "#7e4efc",
      });
      return;
    }

    if (contrasena.length < 8) {
      await Swal.fire({
        title: "Contraseña muy corta",
        text: "La nueva contraseña debe tener al menos 8 caracteres.",
        icon: "error",
        background: "#2a0054",
        color: "#ffffff",
        iconColor: "#ffcc00",
        confirmButtonColor: "#7e4efc",
      });
      return;
    }

    const res: ApiResponse = await ApiPrivate("registrar", {
      nombre,
      segundoNombre,
      apellido,
      segundoApellido,
      correo,
      celular,
      contrasena,
      direccion,
      complemento,
    });

    if (res && res.status === 409) {
      await Swal.fire({
        title: "Correo ya registrado",
        text: res.mensaje,
        icon: "error",
        background: "#2a0054",
        color: "#ffffff",
        iconColor: "#red",
        confirmButtonColor: "#7e4efc",
      });
      return;
    }

    await Swal.fire({
      title: "Registro Exitoso",
      text: `¡Bienvenido a NVS ${nombre} ${apellido}!`,
      icon: "success",
      background: "#2a0054",
      color: "#ffffff",
      iconColor: "#00a135",
      confirmButtonColor: "#7e4efc",
    }).then((result) => {
      if (result.isConfirmed) {
        Navigate("/iniciarSesion");
        window.location.reload();
      }
    });
  };

  return (
    <form onSubmit={handleSubmit2}>
      <div className="registro-container-buttom">
        <input
          type="text"
          placeholder="Nombre*"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setNombre(e.target.value)
          }
        />
        <input
          type="text"
          placeholder="Segundo Nombre"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSegundoNombre(e.target.value)
          }
        />
      </div>
      <div className="registro-container-buttom">
        <input
          type="text"
          placeholder="Apellido*"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setApellido(e.target.value)
          }
        />

        <input
          type="text"
          placeholder="Segundo Apellido"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSegundoApellido(e.target.value)
          }
        />
      </div>

      <div className="registro-container-buttom">
        <input
          type="email"
          placeholder="Correo*"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setCorreo(e.target.value)
          }
        />
        <input
          type="number"
          placeholder="Número*"
          name="numero"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setCelular(e.target.value)
          }
        />
      </div>

      <div className="registro-container-buttom">
        <input
          type="password"
          placeholder="Contraseña*"
          name="contrasena"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setContrasena(e.target.value)
          }
        />
        <input
          type="password"
          placeholder="Confirmar Contraseña*"
          name="contrasena2"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setConfirmarContrasena(e.target.value)
          }
        />
      </div>

      <div className="registro-container2">
        <input
          type="text"
          placeholder="Dirección*"
          name="direccion"
          className="LongInput"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setDireccion(e.target.value)
          }
        />
        <input
          type="text"
          placeholder="Datos Adicionales de dirección..."
          name="datos"
          className="LongInput"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setComplemento(e.target.value)
          }
        />
      </div>
      <button className="buttom" type="submit">
        Registrar
      </button>
      <Link to={"/iniciarSesion"} className="registrar-buttom2">
        Cancelar
      </Link>
    </form>
  );
};

export default Formulario;
