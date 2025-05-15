import '../../styles/Tienda/Categorias.css';

  type CardProps = {
    consola: string;
    titulo: string;
  }

function Categorias({consola, titulo}: CardProps) {

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

export default Categorias;