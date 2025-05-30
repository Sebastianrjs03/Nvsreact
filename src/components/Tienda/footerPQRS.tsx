import React, { useState } from 'react';
import './PQRSFooter.css';
import { ApiPrivate } from "../../hooks/UseFetch";
import Swal from "sweetalert2";

interface Props {
  idCliente?: number; // ahora es opcional
}

export default function PQRSFooter({ idCliente }: Props) {
  const [pqrs, setPqrs] = useState('');

  const enviarPQRS = async () => {
    if (!pqrs.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Campo vacío",
        text: "Por favor escribe tu PQRS antes de enviarla.",
      });
      return;
    }

    if (!idCliente) {
      Swal.fire({
        icon: "error",
        title: "Usuario no identificado",
        text: "Debes iniciar sesión para enviar una PQRS.",
      });
      return;
    }

    const data = {
      idCliente,
      fecha: new Date().toISOString().split('T')[0],
      pqrs
    };

    const resultado = await ApiPrivate("?ruta=EnviarPQRS", data);

    if (resultado?.success) {
      Swal.fire({
        icon: "success",
        title: "¡PQRS enviada!",
        text: "Gracias por tu mensaje. Pronto recibirás respuesta.",
      });
      setPqrs('');
    } else {
      Swal.fire({
        icon: "error",
        title: "Error al enviar PQRS",
        text: resultado?.mensaje ?? "Intenta más tarde.",
      });
    }
  };

  return (
    <div className="footer-container">
      <h2>¿Tienes una PQRS?</h2>
      <textarea
        placeholder="Escribe aquí tu pregunta, queja, reclamo o sugerencia..."
        value={pqrs}
        onChange={(e) => setPqrs(e.target.value)}
        rows={5}
      />
      <button onClick={enviarPQRS}>Enviar</button>
    </div>
  );
}
