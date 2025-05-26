import '../../styles/Pagos/BodyPagos.css';
import logoPaypal from '../../assets/logosPagos/paypal.svg';
import logoMercadoPago from '../../assets/logosPagos/mercadopago.svg';
import { PayPalButtons } from "@paypal/react-paypal-js";

interface Props {
    total: number;
}

function BodyPagos({ total }: Props) {
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


                    <div style={{ marginTop: "15px", width: "100%" }}>
                        <PayPalButtons
                            style={{
                                layout: "vertical",
                                color: "blue",     
                                shape: "pill",     
                                label: "pay",      
                                height: 55         
                            }}
                            createOrder={(data, actions) => {
                                return actions.order.create({
                                    intent: "CAPTURE",
                                    purchase_units: [{
                                        amount: {
                                            value: total.toFixed(2),
                                            currency_code: "USD"
                                        }
                                    }]
                                });
                            }}
                            onApprove={async (data, actions) => {
                                const details = await actions.order?.capture();
                                console.log("Pago aprobado:", details);
                                alert("¡Pago realizado con éxito!");
                            }}
                        />
                    </div>

                    <button className="bodyPagos-botonMetodo">
                        <img src={logoMercadoPago} alt="Logo de MercadoPago" />
                    </button>
                </div>
            </article>
        </section>
    );
}

export default BodyPagos;
