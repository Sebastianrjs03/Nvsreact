import "../../styles/DetallesProducto/galeriaVideoJuego.css"
import Trailer from "../../assets/detallesProducto/trailer_8.mp4"
import Poster from "../../assets/detallesProducto/banner_12.jpg"
import Visual1 from "../../assets/detallesProducto/visual1_12.jpg"
import Visual2 from "../../assets/detallesProducto/visual2_12.jpg"
import Visual3 from "../../assets/detallesProducto/visual3_12.jpg"



function GaleriaVideoJuego() {
    return (

        <section className="galeriaVideoJuego">

            <h2>Visuales</h2>
            <div className="galeriaVideoJuego-visuales">
                <div className="galeriaVideoJuego-video">

                    <video src={Trailer} controls muted poster={Poster}></video>

                </div>
                <div  className="galeriaVideoJuego-imagenes">
                    <img src={Visual1} alt="" />
                    <img src={Visual2} alt="" />
                    <img src={Visual3} alt="" />
                </div>
            </div>

        </section>



    );
}

export default GaleriaVideoJuego;