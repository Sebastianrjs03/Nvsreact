import { useState } from "react";
import "../../styles/Tienda/FooterPQRS.css";
import { ApiPrivate } from "../../hooks/UseFetch";
import Swal from "sweetalert2";
import logo from "../../assets/logoNVS.svg";

function PQRSFooter() {
  const [mensaje, setMensaje] = useState("");

  const handleEnviar = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      Swal.fire({
        icon: "warning",
        title: "Sesión requerida",
        text: "Debes iniciar sesión para enviar una PQRS.",
        background: "#2a0054",
        color: "#ffffff",
        confirmButtonColor: "#7e4efc",
      });
      return;
    }

    const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");
    const idCliente = usuario?.idUsuario;

    if (!mensaje.trim()) {
      Swal.fire({
        icon: "info",
        title: "Campo vacío",
        text: "Por favor escribe un comentario antes de enviar.",
        background: "#2a0054",
        color: "#ffffff",
        iconColor: "#ffcc00",
        confirmButtonColor: "#7e4efc",
      });
      return;
    }

    const data = {
      idCliente,
      fecha: new Date().toISOString().split("T")[0],
      pqrs: mensaje,
    };

    console.log("Datos a enviar:", data);

    const response = await ApiPrivate("EnviarPQRS", data);

    if (response?.success) {
      Swal.fire({
        icon: "success",
        title: "¡Enviado!",
        text: "Tu PQRS ha sido enviada correctamente.",
        background: "#2a0054",
        color: "#ffffff",
        iconColor: "#00a135",
        confirmButtonColor: "#7e4efc",
      });
    } else {
      Swal.fire({
        icon: "info",
        title: "Ya tienes una PQRS pendiente",
        text: response?.mensaje,
        background: "#2a0054",
        color: "#ffffff",
        iconColor: "#ffcc00",
        confirmButtonColor: "#7e4efc",
      });
    }
  };

  return (
    <div className="footer-pqrs">
      <div className="pqrs-container">
        <h2>¿Tienes una PQRS?</h2>
        <textarea
          className="pqrs-textarea"
          placeholder="Escribe aquí tu pregunta, queja, reclamo o sugerencia..."
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
        />
        <button className="pqrs-button" onClick={handleEnviar}>
          Enviar
        </button>
        <p className="pqrs-info">
          Recuerda que puedes enviar una PQRS por usuario. Para enviar una PQRS
          diferente debes esperar la respuesta de soporte.
        </p>
      </div>
      <div className="logo-container">
        <img src={logo} alt="" />
      </div>
    </div>
  );
}

export default PQRSFooter;
