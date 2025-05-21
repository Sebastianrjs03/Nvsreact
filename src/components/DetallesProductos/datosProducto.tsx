import "../../styles/DetallesProducto/datosProducto.css";

type DatosProductoProps = {
  titulo: string;
  marca: string;
  precio: number;
  descuento: string;
  tipoProducto: string;

};

function DatosProducto({ titulo, marca, precio, descuento, tipoProducto }: DatosProductoProps) {

  const precioFormateado = new Intl.NumberFormat("es-CL").format(precio);

  return (

    <article className="datosProducto">
      <div>
        <h2>{titulo}</h2>

        {tipoProducto == 'videojuego' && (
        <p className="datosProducto-marca">{marca}</p>
         )}
         
      </div>
      <div>
        <p className="datosProducto-descuento">{descuento}%</p>
        <p className="datosProducto-precio">{precioFormateado}</p>
        <button className="datosProducto-botonCarrito">
          Agregar al Carrito
        </button>
      </div>
    </article>
  );
}

export default DatosProducto;
