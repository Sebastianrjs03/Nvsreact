import '../../styles/Carrito/DetalleResumenCarrito.css'

type DetalleResumenCarritoProps =
    {
        Total: string;
        Detalle: string;
        Precio: string;
    }

function DetalleResumenCarrito({Total, Detalle, Precio }: DetalleResumenCarritoProps) {

    let color;
    
    switch (Total) {
        case "total":
            color = "total";    
            break;
        default:
            color = "resumenCarrito-detalle"
    }

    const styleTotal = color

    
  const precioFormateado = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  minimumFractionDigits: 0,
}).format(Number(Precio));

    return (

        <div className={styleTotal}>
            <span>{Detalle}</span>
            <span>{precioFormateado}</span>
        </div>

    );
}

export default DetalleResumenCarrito;