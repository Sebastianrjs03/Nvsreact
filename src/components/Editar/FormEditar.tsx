import "../../styles/Perfil/FormEditar.css";
import Swal from "sweetalert2";
import { ApiPrivate } from "../../hooks/UseFetch";
import { useState, ChangeEvent } from "react";

type FormEditarProps = {
  tipoBotones: string;
  placeholder1: string;
  name1: string;
  placeholder2: string;
  name2: string;
  dato: string;
};

type updateResponse = {
  mensaje: string;
  usuario: {
    correoUsuario: string;
  };
};

// Tipo genérico para manejar errores o respuestas exitosas
type ApiResponse<T> =
  | T
  | {
      error: true;
      status: number;
      mensaje: string;
    };

function FormEditar({
  tipoBotones,
  placeholder1,
  name1,
  placeholder2,
  name2,
  dato,
}: FormEditarProps) {
  const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");

  const idUsuario = usuario?.idUsuario;
  const [input1, setInput1] = useState<string>("");
  const [input2, setInput2] = useState<string>("");
  const [contrasena, setContrasena] = useState<string>("");

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async () => {
    let res: ApiResponse<updateResponse> | undefined;

    if (
      (name1 == "email" && name2 == "confirmarEmail") ||
      (name1 == "nuevaContrasena" && name2 == "confirmarContrasena")
    ) {
      if (!input1.trim() || !input2.trim() || !contrasena.trim()) {
        await Swal.fire({
          title: "Campos incompletos",
          text: "Por favor, completa todos los campos obligatorios.",
          icon: "warning",
          background: "#2a0054",
          color: "#ffffff",
          iconColor: "#ffcc00",
          confirmButtonColor: "#7e4efc",
        });
        return;
      }
    } else if (name1 == "direccion") {
      if (!input1.trim() || !contrasena.trim()) {
        await Swal.fire({
          title: "Campos incompletos",
          text: "Por favor, completa todos los campos obligatorios.",
          icon: "warning",
          background: "#2a0054",
          color: "#ffffff",
          iconColor: "#ffcc00",
          confirmButtonColor: "#7e4efc",
        });
        return;
      }
    }

    if (
      (name1 == "nuevaContrasena" && name2 == "confirmarContrasena") ||
      (name1 == "email" && name2 == "confirmarEmail")
    ) {
      const letra = dato == "Contraseña" ? "ambas" : "ambos";
      const minuscula = dato.toLowerCase();

      if (input1 !== input2) {
        await Swal.fire({
          title: `${dato}s no coinciden`,
          text: `Por favor, asegúrate de que ${letra} ${minuscula}s sean iguales.`,
          icon: "error",
          background: "#2a0054",
          color: "#ffffff",
          iconColor: "#ffcc00",
          confirmButtonColor: "#7e4efc",
        });
        return;
      }
    }

    if (name1 == "email" && name2 == "confirmarEmail") {
      if (!validateEmail(input1) || !validateEmail(input2)) {
        await Swal.fire({
          title: "Email no válido",
          text: "Por favor, ingresa un correo electrónico válido en ambos campos.",
          icon: "error",
          background: "#2a0054",
          color: "#ffffff",
          iconColor: "#ffcc00",
          confirmButtonColor: "#7e4efc",
        });
        return;
      }
      const correo = input1;

      res = await ApiPrivate("actualizarPerfil", {
        idUsuario,
        correo,
        contrasena,
      });
    }

    if (name1 == "nuevaContrasena" && name2 == "confirmarContrasena") {
      const nuevaContrasena = input1;

      if (nuevaContrasena.length < 8) {
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

      res = await ApiPrivate("actualizarPerfil", {
        idUsuario,
        nuevaContrasena,
        contrasena,
      });
    }

    if (name1 == "direccion") {
      const direccion = input1;
      const complemento = input2;

      res = await ApiPrivate("actualizarPerfil", {
        idUsuario,
        direccion,
        complemento,
        contrasena,
      });
    }

    if (res && "error" in res) {
      await Swal.fire({
        title: "Contraseña Incorrecta",
        text: "Verifica tu Contraseña",
        icon: "error",
        background: "#2a0054",
        color: "#ffffff",
        iconColor: "#red",
        confirmButtonColor: "#7e4efc",
      });
      return;
    }

    localStorage.setItem("usuario", JSON.stringify(res && res.usuario));

    const letra = dato == "Contraseña" || "Direccion" ? "actualizada" : "actualizado";
    const minuscula = dato.toLowerCase();

    await Swal.fire({
      title: `${dato} ${letra}`,
      text: `Tu ${minuscula} ha sido ${letra} correctamente.`,
      icon: "success",
      background: "#2a0054",
      color: "#ffffff",
      iconColor: "#00a135",
      confirmButtonColor: "#7e4efc",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.reload();
      }
    });
  };

  return (
    <div className="formEditar-container">
      <form className="formEditar-form">
        <input
          type={tipoBotones}
          placeholder={placeholder1}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setInput1(e.target.value)
          }
        />
        <input
          type={tipoBotones}
          placeholder={placeholder2}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setInput2(e.target.value)
          }
        />
        <input
          type="password"
          placeholder="Contraseña"
          name="contrasena"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setContrasena(e.target.value)
          }
        />
      </form>

      <button onClick={handleSubmit} className="formEditar-button">
        Aceptar
      </button>
    </div>
  );
}

export default FormEditar;
