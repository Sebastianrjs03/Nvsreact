import { useEffect, useState } from "react";
import { ApiPublic } from "../../hooks/UseFetch";
import { useParams } from "react-router-dom";
import "../../styles/DetallesProducto/imagenesConsola.css"

function ImagenesConsola() {
  const [portadaUrl, setPortadaUrl] = useState<string>("");
  const [auxiliaresUrls, setAuxiliaresUrls] = useState<string[]>([]);
  const { id } = useParams();

  useEffect(() => {
    const getImagenes = async () => {
      if (!id) return;

      try {
        // Obtener portada
        const resultPortada = await ApiPublic("ConsultarPorId_Imagenes", {
          id: id,
          categoria: "portada",
          carpeta: "Consola",
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

        // Obtener imágenes auxiliares (visuales)
        const resultVisuales = await ApiPublic("ConsultarPorId_Imagenes", {
          id: id,
          categoria: "visuales",
          carpeta: "Consola",
        });

        if (resultVisuales) {
          const urls = (Object.values(resultVisuales) as string[]).map((ruta) =>
            ruta
              .replace("c:\\xampp\\htdocs\\api-php", "http://localhost/api-php")
              .replace(/\\/g, "/")
          );
          setAuxiliaresUrls(urls);
        }

      } catch (error) {
        console.error("Error al obtener imágenes:", error);
      }
    };

    getImagenes();
  }, [id]);

  return (
    <article className="imagenesConsola">
      <div className="imagenesConsola-auxiliares">
        {auxiliaresUrls.length > 0 ? (
          auxiliaresUrls.map((src, i) => (
            <img key={i} src={src} alt={`Visual ${i + 1}`} />
          ))
        ) : (
          <p>No hay imágenes auxiliares.</p>
        )}
      </div>

      <div className="imagenesConsola-principal">
        {portadaUrl ? (
          <img  src={portadaUrl} alt="Portada consola" />
        ) : (
          <p>No hay portada disponible.</p>
        )}
      </div>
    </article>
  );
}

export default ImagenesConsola;
