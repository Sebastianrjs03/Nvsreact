import "../../styles/DetallesProducto/imagenVideojuego.css"

const imagenVideojuego = import.meta.glob(
  "../../assets/Videojuegos/Portada/*.webp",
  { eager: true }
);

const getImage = (name: string) => { 
  return (imagenVideojuego[`../../assets/Videojuegos/Portada/${name}.webp`] as {default: string})?.default; // Si no se encuentra imagen, retorna string vacío o un placeholder
};

type ImagenVideoJuegoProps = {
  imagen: string;
};


function ImagenVideojuego({imagen}: ImagenVideoJuegoProps) {
      const imagenPortada = getImage(imagen);
    return (

        <article className="imagenVideoJuego">

            <div className="imagenVideoJuego-portada">
                <img src={imagenPortada} alt="" />
            </div>


        </article>

    );
}

export default ImagenVideojuego;
