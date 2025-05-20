import "../../styles/Tienda/Card.css";
import Descuento from "./Descuento";

const imagenesVideojuegos = import.meta.glob(
  "../../assets/Videojuegos/Portada/*.webp",
  { eager: true }
);
const imagenesConsolas = import.meta.glob(
  "../../assets/Consolas/Portada/*.webp",
  { eager: true }
);

const todasLasImagenes = {
  ...imagenesVideojuegos,
  ...imagenesConsolas,
};

const getImage = (name: string) => {
  const rutas = [
    `../../assets/Videojuegos/Portada/${name}.webp`,
    `../../assets/Consolas/Portada/${name}.webp`,
  ];

  for (const ruta of rutas) {
    const imagen = todasLasImagenes[ruta] as { default: string } | undefined;
    if (imagen) return imagen.default;
  }

  return ""; // Si no se encuentra imagen, retorna string vacío o un placeholder
};

type CardProps = {
  consola: string;
  titulo: string;
  precio: number;
  descuento?: number;
  imagen: string;
};

function Card({ consola, titulo, precio, descuento, imagen }: CardProps) {
  const imagenPortada = getImage(imagen);

  const precioFormateado = new Intl.NumberFormat("es-CL").format(precio);
  const precioDescuento = descuento
    ? new Intl.NumberFormat("es-CL").format(descuento)
    : undefined;

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

  return (
    <article className={cardContenedor}>
      <div className={cardImagen}>
        <img className="card-imagenPortada" src={imagenPortada} alt="" />
      </div>
      <div className="card-informacion">
        <h3 className="card-titulo">{titulo}</h3>
        <div className="card-precioContenedor">
          <p className="card-precio">${precioFormateado} COP</p>
          {precioDescuento && (
            <p className="card-precioDesc">{precioDescuento}COP</p>
          )}
        </div>
      </div>
    </article>
  );
}

export default Card;
