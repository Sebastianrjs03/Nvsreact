import "../../styles/Pagos/BodyPagos.css";
import { PayPalButtons } from "@paypal/react-paypal-js";
import Swal from "sweetalert2";
import ModalPagos from "./ModalPagos";
import { ApiPrivate } from "../../hooks/UseFetch";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import LogoPaypal from "../../assets/Pagos/paypalLogo.png";

interface Props {
  total: number;
}

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

function BodyPagos({ total }: Props) {
  const navigate = useNavigate();

  let res: ApiResponse<updateResponse> ;

  const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");
  const idUsuario = usuario?.idUsuario;

  const [complemento, setComplemento] = useState<string>(
    usuario.complemento || ""
  );
  const [direccion, setDireccion] = useState<string>(usuario.direccion || "");
  const [contrasena, setContrasena] = useState<string>("");

  const handleSubmit = async () => {
    if (!direccion.trim() || !contrasena.trim()) {
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
    } else {
      res = await ApiPrivate("actualizarPerfil", {
        idUsuario,
        direccion,
        complemento,
        contrasena,
      });
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
    }

    localStorage.setItem("usuario", JSON.stringify(res && res.usuario));

    await Swal.fire({
      title: "Dirección Actualizada",
      text: "Tu direccion ha sido actualizada correctamente.",
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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const cerrarModal = () => setIsModalOpen(false);
  const abrirModal = () => setIsModalOpen(true);

  const tasaCambio = 4800;
  const totalUSD = parseFloat((total / tasaCambio).toFixed(2));

  const handlePagoAprobado = async () => {
    const resumenString = localStorage.getItem("resumenPago");

    if (!resumenString) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se encontró el resumen del pago.",
      });
      return;
    }

    const resumen = JSON.parse(resumenString);
    const token = localStorage.getItem("token");
    const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");
    const clienteId = usuario.idUsuario;
    const rol = localStorage.getItem("rol");

    if (!token && rol !== "1") {
      Swal.fire({
        icon: "warning",
        title: "Sesión requerida",
        text: "Debes iniciar sesión para registrar la factura.",
      });
      return;
    }

    const facturaData = {
      clienteId: parseInt(clienteId),
      subtotal: resumen.subtotal,
      total: resumen.total,
      productos: resumen.productos,
    };

    const respuesta = await ApiPrivate(
      "Crear_DetalleFacturaCompleto",
      facturaData
    );

    if (respuesta && "error" in respuesta) {
      Swal.fire({
        icon: "error",
        title: "Error al registrar factura",
        text: respuesta?.mensaje || "Ocurrió un problema inesperado.",
      });
    } else {
      Swal.fire({
        title: "Pago realizado con éxito",
        text: "La factura ha sido envida a tu correo.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
        background: "#2a0054",
        color: "#ffffff",
        iconColor: "#00a135",
      }).then(() => {
        localStorage.removeItem("resumenPago");
        localStorage.removeItem("ids");
        navigate("/");
        window.location.reload();
      });
    }
  };

  return (
    <section className="bodyPagos-infoPago">
      <article className="bodyPagos-direccionEnvio">
        <h2 className="bodyPagos-titulo1">Dirección de Envío</h2>
        <input
          type="text"
          placeholder="Dirección"
          defaultValue={direccion || ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setDireccion(e.target.value);
          }}
        />
        <textarea
          defaultValue={complemento || ""}
          placeholder="Complemento (opcional)"
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            setComplemento(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Contraseña para confirmar"
          defaultValue={contrasena || ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setContrasena(e.target.value);
          }}
        />
        <p className="bodyPagos-informacion">
          Asegúrate de que la dirección sea correcta para evitar problemas con
          el envío.
        </p>
        <button onClick={handleSubmit} className="resumenCarrito-botonPago">
          <i className="fa-solid fa-location-dot"></i>
          <span>Cambiar Dirección</span>
        </button>
      </article>
      <article className="bodyPagos-metodoPago">
        <h2 className="bodyPagos-titulo">Paga con PayPal</h2>
        <button onClick={abrirModal} className="bodyPagos-botonMetodo">
          <i className="fa-brands fa-paypal"></i>
          <span>PayPal</span>
          <span className="bodyPagos-totalPago">
            (${totalUSD.toFixed(2)} USD)
          </span>
        </button>
        <ModalPagos isOpen={isModalOpen} onClose={cerrarModal}>
          <header className="modalPagos-header">
            <img src={LogoPaypal} alt="Logo de Paypal" />
          </header>
          <div className="bodyPagos-opcionesMetodo">
            <div style={{ marginTop: "15px", width: "100%" }}>
              <PayPalButtons
                style={{
                  layout: "vertical",
                  color: "blue",
                  shape: "pill",
                  label: "pay",
                  height: 55,
                }}
                createOrder={(_data, actions) => {
                  return actions.order.create({
                    intent: "CAPTURE",
                    purchase_units: [
                      {
                        amount: {
                          value: totalUSD.toString(),
                          currency_code: "USD",
                        },
                      },
                    ],
                  });
                }}
                onApprove={async (_data, actions) => {
                  const details = await actions.order?.capture();
                  console.log("Pago aprobado:", details);
                  await handlePagoAprobado();
                }}
              />
            </div>
          </div>
        </ModalPagos>
      </article>
    </section>
  );
}

export default BodyPagos;
