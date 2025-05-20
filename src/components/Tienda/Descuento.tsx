import '../../styles/Tienda/Descuento.css';


  type CardProps = {
    consola: string;
    precio: number;
  }

function Descuento({consola, precio}: CardProps) {
    
    let color;

    switch (consola) {
      case "xbox":
        color = "xboxDescuento";
        break;
      case "play":
        color = "playDescuento";
        break;
      case "nintendo":
        color = "nintendoDescuento";
        break;
        default:
        color = "defaultDescuento";
        break;
    }

    const descuentoBody = `descuento-body ${color}`;
 
    return(
        <span className={descuentoBody}>
           -{precio}%
        </span>

    );
}

export default Descuento;