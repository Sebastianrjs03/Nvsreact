import '../../styles/Tienda/Banner.css';
import Informacion from './Informacion';

const imagenes = import.meta.glob('../../assets/Videojuegos/Banners/*.jpg', { eager: true });
const imagenesRecorte = import.meta.glob('../../assets/Recortes/*.png', { eager: true });


const getImage = (name: string) => {
    return (imagenes[`../../assets/Videojuegos/Banners/${name}.jpg`] as { default: string })?.default;
  };
  const getImageRecorte = (name: string) => {
    return (imagenesRecorte[`../../assets/Recortes/recorte${name}.png`] as { default: string })?.default;
  };

type BannerProps = {
    Imagen: string;
    Titulo: string;
    Recorte: string;
    precio: number;
    descuento?: number | undefined;
}


function Banner({Imagen, Titulo, Recorte, precio, descuento}: BannerProps) {

  const ImagenBanner = getImage(Imagen);
  const ImagenRecorte = getImageRecorte(Recorte);

    return(
        <header className="banner-header">
        <img className="banner-imagen" src={ImagenBanner} alt=""/>
        <div className="banner-info-contenedor">
        <p className="banner-titulo">{Titulo}</p>
        <Informacion 
        colorBoton={Recorte}
        precio={precio}
        descuento={descuento} 
        />
        </div>
        <img className="Banner-corte-morado" src={ImagenRecorte} alt=""/>
      </header>
    );
}

export default Banner;