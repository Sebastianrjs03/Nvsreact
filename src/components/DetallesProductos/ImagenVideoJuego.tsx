import { useEffect, useState } from "react";
import { ApiPublic } from "../../hooks/UseFetch";
import { useParams } from "react-router-dom";
import "../../styles/DetallesProducto/imagenVideojuego.css"

function ImagenVideojuego() {

  const [portadaUrl, setPortadaUrl] = useState<string>("");

  const { id } = useParams();

  useEffect(() => {
    const getImagenes = async () => {
      if (!id) return;

      try {
        
        const resultPortada = await ApiPublic("ConsultarPorId_Imagenes", {
          id: id,
          categoria: "portada",
          carpeta: "Videojuego",
        });

        if (resultPortada) {
          const keys = Object.keys(resultPortada);
          if (keys.length > 0) {
            const rutaLocal = resultPortada[keys[0]];
            const urlPublica = rutaLocal
              .replace("c:\\xampp\\htdocs\\api-php", "http://localhost/api-php")
              .replace(/\\/g, "/");

            setPortadaUrl(urlPublica);
          }
        }

      } catch (error) {
        console.error("Error al obtener imágenes:", error);
      }
    };

    getImagenes();
  }, [id]);

  return (

    <article className="imagenVideoJuego">

      <div className="imagenVideoJuego-portada">
        {portadaUrl ? (
          <img src={portadaUrl} alt="Portada Videojuego" />
        ) : (
          <p>No hay portada disponible.</p>
        )}
      </div>


    </article>

  );
}

export default ImagenVideojuego;
