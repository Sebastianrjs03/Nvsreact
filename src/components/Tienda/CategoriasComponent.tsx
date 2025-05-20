import '../../styles/Tienda/Categorias.css';

  type CardProps = {
    consola: string;
    titulo: string;
  }

function CategoriasComponent({consola, titulo}: CardProps) {

    let color;

    switch (consola) {
      case "xbox":
        color = "xboxCategoria";
        break;
      case "play":
        color = "playCategoria";
        break;
      case "nintendo":
        color = "nintendoCategoria";
        break;
        default:
        color = "default-categorias";
        break;
    }

    const cardContenedor = `categoriasCard-contenedor ${color}`;


    return(
    <article className={cardContenedor}>
            <h3 className='categoriasCard-titulo'>{titulo}</h3>
    </article>

    );
}

export default CategoriasComponent;