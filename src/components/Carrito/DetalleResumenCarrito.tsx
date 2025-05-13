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

    return (

        <div className={styleTotal}>
            <span>{Detalle}</span>
            <span>{Precio}</span>
        </div>

    );
}

export default DetalleResumenCarrito;