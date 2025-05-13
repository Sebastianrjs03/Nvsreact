import '../../styles/Carrito/BodyCarrito.css'
type BodyCarritoProps = {children: React.ReactNode}

function BodyCarrito({children}:BodyCarritoProps) {
    return (


        <section className="bodyCarrito-section">

            <h2 className="bodyCarrito-titulo">Carrito</h2>

            <div className="bodyCarrito-contenedorCarts">

                {children}

            </div>

        </section>


    );
}

export default BodyCarrito;