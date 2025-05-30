import "../../styles/Perfil/FormEditarPersonales.css";
import Swal from "sweetalert2";
import { useState, ChangeEvent } from "react";
import { ApiPrivate } from "../../hooks/UseFetch.tsx";

type FormEditarPersonalesProps = {
  value1?: string;
  value2?: string;
  value3?: string;
  value4?: string;
  value5?: string;
};

type updateResponse = {
  mensaje: string;
  usuario: {
    nombreUsuario: string;
    senombreUsuario?: string;
    apellidoUsuario: string;
    seapellidoUsuario?: string;
    correoUsuario: string;
    celularUsuario: string;
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

function FormEditarPersonales({
  value1,
  value2,
  value3,
  value4,
  value5,
}: FormEditarPersonalesProps) {
  const idUsuario = 44;
  const [nombre, setNombre] = useState<string>(value1 || "");
  const [segundoNombre, setSegundoNombre] = useState<string>(value2 || "");
  const [apellido, setApellido] = useState<string>(value3 || "");
  const [segundoApellido, setSegundoApellido] = useState<string>(value4 || "");
  const [celular, setCelular] = useState<string>(value5 || "");
  const [contrasena, setContrasena] = useState<string>("");

  const handleSubmit = async () => {
    if (!nombre.trim() || !apellido.trim() || !celular.trim()) {
      await Swal.fire({
        title: "Campos incompletos",
        text: "Por favor, completa todos los campos.",
        icon: "warning",
        background: "#2a0054",
        color: "#ffffff",
        iconColor: "#ffcc00",
        confirmButtonColor: "#7e4efc",
      });
      return;
    }

    const res: ApiResponse<updateResponse> = await ApiPrivate(
      "actualizarPerfil",
      {
        idUsuario,
        nombre,
        segundoNombre,
        apellido,
        segundoApellido,
        celular,
        contrasena,
      }
    );

    if ("error" in res) {
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

    localStorage.setItem("usuario", JSON.stringify(res.usuario));

    await Swal.fire({
      title: "¡Datos Actualizados!",
      text: "Tus datos personales han sido actualizados correctamente.",
      icon: "success",
      background: "#2a0054",
      color: "#ffffff",
      iconColor: "#00a135",
      confirmButtonColor: "#7e4efc",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.reload(); // Recarga la página después de presionar OK
      }
    });
  };

  return (
    <div className="formEditarPersonales-container">
      <form className="formEditarPersonales-form">
        <input
          type=""
          placeholder="Nombre*"
          name="nombre"
          value={nombre}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setNombre(e.target.value)
          }
        />
        <input
          type=""
          placeholder="Segundo Nombre"
          name="segundoNombre"
          defaultValue={segundoNombre}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSegundoNombre(e.target.value)
          }
        />
        <input
          type=""
          placeholder="Apellido*"
          name="apellido"
          defaultValue={apellido}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setApellido(e.target.value)
          }
        />
        <input
          type=""
          placeholder="Segundo Apellido"
          name="segundoApellido"
          defaultValue={segundoApellido}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSegundoApellido(e.target.value)
          }
        />

        <input
          className="form-password"
          type="number"
          placeholder="Numero de Celular*"
          name="celular"
          defaultValue={celular}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setCelular(e.target.value)
          }
        />
        <input
          className="form-password"
          type="password"
          placeholder="Contraseña*"
          name="contrasena"
          value={contrasena}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setContrasena(e.target.value)
          }
        />
      </form>

      <button onClick={handleSubmit} className="formEditarPersonales-button">
        Aceptar
      </button>
    </div>
  );
}

export default FormEditarPersonales;
