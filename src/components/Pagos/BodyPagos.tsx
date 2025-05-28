import '../../styles/Pagos/BodyPagos.css';
import logoMercadoPago from '../../assets/logosPagos/mercadopago.svg';
import { PayPalButtons } from "@paypal/react-paypal-js";
import Swal from "sweetalert2";
import { ApiPrivate } from "../../hooks/UseFetch";

interface Props {
    total: number;
}

function BodyPagos({ total }: Props) {
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
        const clienteId = sessionStorage.getItem("idCliente"); // o localStorage según tu lógica

        if (!clienteId) {
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

        const respuesta = await ApiPrivate("index.php?ruta=Crear_DetalleFacturaCompleto", facturaData);

        if (respuesta?.ok) {
            Swal.fire({
                icon: "success",
                title: "¡Pago realizado con éxito!",
                text: "Factura registrada correctamente.",
            });
            localStorage.removeItem("resumenPago");
        } else {
            Swal.fire({
                icon: "error",
                title: "Error al registrar factura",
                text: respuesta?.mensaje || "Ocurrió un problema inesperado.",
            });
        }
    };

    return (
        <section className="bodyPagos-infoPago">
            <article className="bodyPagos-direccionEnvio">
                <h2 className="bodyPagos-titulo">Dirección de Envío</h2>
                <input type="text" placeholder="Dirección" />
                <textarea placeholder="Información adicional...."></textarea>
            </article>

            <article className="bodyPagos-metodoPago">
                <h2 className="bodyPagos-titulo">Método de pago</h2>
                <div className="bodyPagos-opcionesMetodo">
                    <div style={{ marginTop: "15px", width: "50%" }}>
                        <PayPalButtons
                            style={{
                                layout: "vertical",
                                color: "blue",
                                shape: "pill",
                                label: "pay",
                                height: 55,
                            }}
                            createOrder={(data, actions) => {
                                return actions.order.create({
                                    intent: "CAPTURE",
                                    purchase_units: [{
                                        amount: {
                                            value: totalUSD.toString(),
                                            currency_code: "USD",
                                        },
                                    }],
                                });
                            }}
                            onApprove={async (data, actions) => {
                                const details = await actions.order?.capture();
                                console.log("Pago aprobado:", details);
                                await handlePagoAprobado();
                            }}
                        />
                    </div>

                </div>
            </article>
        </section>
    );
}

export default BodyPagos;
