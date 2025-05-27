import '../../styles/Tienda/Banner.css';

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
    Recorte: string;
}


function BannerProducto({Imagen, Recorte}: BannerProps) {

  const ImagenBanner = getImage(Imagen);XMLDocument
  const ImagenRecorte = getImageRecorte(Recorte);

    return(
        <header className="banner-header">
        <img className="banner-imagen" src={ImagenBanner} alt=""/>
        <img className="Banner-corte-morado" src={ImagenRecorte} alt=""/>
      </header>
    );
}

export default BannerProducto;