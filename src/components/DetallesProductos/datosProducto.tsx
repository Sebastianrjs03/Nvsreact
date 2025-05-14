import "../../styles/DetallesProducto/datosProducto.css";

type DatosProductoProps = {
  titulo: string;
  marca: string;
  precio: string;

};

function DatosProducto({ titulo, marca, precio }: DatosProductoProps) {
  return (

    <article className="datosProducto">
      <div>
        <h2>{titulo}</h2>
        <p className="datosProducto-marca">{marca}</p>
      </div>
      <div>
        <p className="datosProducto-precio">{precio}</p>
        <button className="datosProducto-botonCarrito">
          Agregar al Carrito
        </button>
      </div>
    </article>
  );
}

export default DatosProducto;
