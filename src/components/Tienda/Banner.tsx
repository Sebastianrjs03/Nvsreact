import '../../styles/Tienda/Banner.css';
import Informacion from './Informacion';
import Recorte from '../../assets/Recortes/recorteMorado.png';

const imagenes = import.meta.glob('../../assets/Banners/*.jpg', { eager: true });

const getImage = (name: string) => {
    return (imagenes[`../../assets/Banners/${name}.jpg`] as { default: string })?.default;
  };

type BannerProps = {
    Imagen: string;
    Titulo: string;
}


function Banner({Imagen, Titulo}: BannerProps) {

  const ImagenBanner = getImage(Imagen);

    return(
        <header className="banner-header">
        <img className="banner-imagen" src={ImagenBanner} alt=""/>
        <p className="banner-titulo">{Titulo}</p>
        <Informacion/>
        <img className="Banner-corte-morado" src={Recorte} alt=""/>
      </header>
    );
}

export default Banner;