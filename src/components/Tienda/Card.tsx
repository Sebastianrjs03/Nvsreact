import { useEffect, useState } from "react";
import "../../styles/Tienda/Card.css";
import { ApiPublic } from "../../hooks/UseFetch";

type CardProps = {
  consola: string;
  titulo: string;
  precio: number;
  descuento?: number;
  imagen: string;
};

function Card({ consola, titulo, precio, descuento, imagen }: CardProps) {
  const [imagenPortada, setImagenPortada] = useState<string | undefined>();

  useEffect(() => {
    const obtenerImagen = async () => {
      try {
        const resultPortadaC = await ApiPublic("Consultar_ImagenesCategoria", {
          categoria: "portada",
          carpeta: "Consola",
        });

        const resultPortadaV = await ApiPublic("Consultar_ImagenesCategoria", {
          categoria: "portada",
          carpeta: "Videojuego",
        });

        if (resultPortadaC?.[imagen]) {
          setImagenPortada(resultPortadaC[imagen]);
        } else if (resultPortadaV?.[imagen]) {
          setImagenPortada(resultPortadaV[imagen]);
        }
      } catch (error) {
        console.error("Error al obtener imágenes:", error);
      }
    };

    obtenerImagen();
  }, [imagen]);

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
