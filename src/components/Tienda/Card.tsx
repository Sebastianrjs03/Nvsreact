import '../../styles/Tienda/Card.css';

const imagenes = import.meta.glob('../../assets/Videojuegos/Portada/*.webp', { eager: true });

const getImage = (name: string) => {
    return (imagenes[`../../assets/Videojuegos/Portada/${name}.webp`] as { default: string })?.default;
  };

  type CardProps = {
    consola: string;
    titulo: string;
    precio: number;
    imagen: string;
  }

function Card({consola, titulo, precio, imagen}: CardProps) {
    
    const imagenPortada = getImage(imagen);

    console.log(imagen);
    const precioFormateado = new Intl.NumberFormat('es-CL').format(precio);
    let color;

    switch (consola) {
      case "xbox":
        color = "xbox";
        break;
      case "play":
        color = "play";
        break;
      case "nintendo":
        color = "nintendo";
        break;
        default:
        color = "default";
        break;
    }

    const cardContenedor = `card-contenedor ${color}`;
    const cardImagen = `card-imagen ${color}-imagen`;
  

    return(
    <article className={cardContenedor}>
        <div className={cardImagen}>
            <img className='card-imagenPortada' src={imagenPortada} alt="" />
        </div>
        <div className='card-informacion'>
            <h3 className='card-titulo'>{titulo}</h3>
            <p className='card-precio'>${precioFormateado} COP</p>
        </div>

    </article>

    );
}

export default Card;