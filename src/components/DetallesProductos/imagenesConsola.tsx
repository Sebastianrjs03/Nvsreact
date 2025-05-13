import "../../styles/DetallesProducto/imagenesConsola.css"
import AUX1 from "../../assets/detallesProducto/auxiliar1_42.jpeg";
import AUX2 from "../../assets/detallesProducto/auxiliar2_42.jpeg";
import AUX3 from "../../assets/detallesProducto/auxiliar3_42.jpeg";
import principal from "../../assets/detallesProducto/ps5.jpg";



function ImagenesConsola() {
  return (

    <article className="imagenesConsola">
      <div className="imagenesConsola-auxiliares">
        <img src={AUX1} alt="auxiliar 1" />
        <img src={AUX2} alt="auxiliar 2" />
        <img src={AUX3} alt="axiliar 3" />
      </div>  
      <div className="imagenesConsola-principal">
        <img src={principal} alt="portada" />
      </div>
    </article>


  );
}

export default ImagenesConsola;
