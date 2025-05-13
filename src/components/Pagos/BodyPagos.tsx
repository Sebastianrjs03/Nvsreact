import '../../styles/Pagos/BodyPagos.css'
import logoPaypal from'../../assets/logosPagos/paypal.svg'
import logoMercadoPago from '../../assets/logosPagos/mercadopago.svg'

function BodyPagos() {
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
                    <button className="bodyPagos-botonMetodo">
                        <img src= {logoPaypal} alt="Logo de Paypal" />
                        <span>Paypal</span>
                    </button>
                    <button className="bodyPagos-botonMetodo">
                        <img src= {logoMercadoPago} alt="Logo de MercadoPago" />

                    </button>
                </div>
            </article>
        </section>



    );
}

export default BodyPagos;