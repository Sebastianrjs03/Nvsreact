import { useState } from 'react';
import '../../styles/Tienda/FooterPQRS.css';
import { ApiPrivate } from "../../hooks/UseFetch";
import Swal from 'sweetalert2';
import logo from '../../assets/logoNVS.svg'

function PQRSFooter() {
  const [mensaje, setMensaje] = useState('');
  const [enviado, setEnviado] = useState(false);

  const handleEnviar = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      Swal.fire({
        icon: 'warning',
        title: 'Sesión requerida',
        text: 'Debes iniciar sesión para enviar una PQRS.',
        background: "#2a0054",
        color: "#ffffff",
        confirmButtonColor: "#7e4efc",
      });
      return;
    }

    const usuarioRaw = localStorage.getItem("usuario");

    if (!usuarioRaw) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se encontró información del usuario.',
      });
      return;
    }

    let usuario;
    try {
      usuario = JSON.parse(usuarioRaw);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error al leer la información del usuario.',
      });
      return;
    }

    const idCliente = usuario?.idUsuario;

    if (!idCliente) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se encontró el ID del cliente.',
      });
      return;
    }

    if (!mensaje.trim()) {
      Swal.fire({
        icon: 'info',
        title: 'Campo vacío',
        text: 'Por favor escribe un comentario antes de enviar.',
        background: "#2a0054",
        color: "#ffffff",
        iconColor: "#00a135",
        confirmButtonColor: "#7e4efc",
      });
      return;
    }

    const data = {
      idCliente,
      comentario: mensaje,
      fecha: new Date().toISOString().split('T')[0],
    };

    const response = await ApiPrivate('/soporte', data);

    if (!response?.error) {
      setEnviado(true);
      setMensaje('');
      Swal.fire({
        icon: 'success',
        title: '¡Enviado!',
        text: 'Tu PQRS ha sido enviada correctamente.',
        background: "#2a0054",
        color: "#ffffff",
        iconColor: "#00a135",
        confirmButtonColor: "#7e4efc",
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error al enviar',
        text: response.mensaje || 'Ocurrió un error al enviar la PQRS.',
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
        <button className="pqrs-button" onClick={handleEnviar}>Enviar</button>
        {enviado}
      </div>
      <div className="logo-container">

        <img src={logo} alt="" />

      </div>
    </div>
  );
}

export default PQRSFooter;
