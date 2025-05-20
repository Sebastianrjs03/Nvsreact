import "../../styles/Tienda/Informacion.css";

type InformacionProps = {
  descuento?: number | undefined;
  precio: number;
  colorBoton: string;
};

function Informacion({ descuento, precio, colorBoton }: InformacionProps) {
  const precioFormateado = new Intl.NumberFormat("es-CL").format(precio);
  const descuentoFormateado = new Intl.NumberFormat("es-CL").format(
    descuento || 0
  );

  let color;

  switch (colorBoton) {
    case "Xbox":
      color = "xbox-boton";
      break;
    case "Playstation":
      color = "play-boton";
      break;
    case "Nintendo":
      color = "nintendo-boton";
      break;
    default:
      color = "default-boton";
      break;
  }

  const botonColor = `info-boton ${color}`;

  return (
    <div className="info-contenedor">
      <div>
        <a className={botonColor} href="">
          INFO
        </a>
      </div>
      <div>
        {descuento && (
          <p className="info-texto-descuento">${descuentoFormateado}</p>
        )}
        <p className="info-texto-precio">${precioFormateado}</p>
      </div>
    </div>
  );
}

export default Informacion;
