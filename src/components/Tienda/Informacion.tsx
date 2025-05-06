import "../../styles/Tienda/Informacion.css";


function Informacion() {
  return (
    <div className="info-contenedor">
      <div>
        <a className="info-boton info-boton-color" href="">
          INFO
        </a>
      </div>
      <div>
        <p className="info-texto-descuento">$4.000.000</p>
        <p className="info-texto-precio">$3.500.000</p>
      </div>
    </div>
  );
}

export default Informacion;
