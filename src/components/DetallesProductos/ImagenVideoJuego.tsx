import "../../styles/DetallesProducto/imagenVideojuego.css"
import portada from "../../assets/detallesProducto/portada_12.jpg";


function ImagenVideojuego() {
    return (

        <article className="imagenVideoJuego">

            <div className="imagenVideoJuego-portada">
                <img src={portada} alt="" />
            </div>


        </article>

    );
}

export default ImagenVideojuego;
