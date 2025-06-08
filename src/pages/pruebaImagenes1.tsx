
import { useEffect, useState } from "react";
import { ApiPublic } from "../hooks/UseFetch";
import { useParams } from "react-router-dom";

function ImagenesConsola() {
  const [portadaUrl, setPortadaUrl] = useState<string>("");
  const [auxiliaresUrls, setAuxiliaresUrls] = useState<string[]>([]);
  const { id } = useParams();

  useEffect(() => {
    const getImagenes = async () => {
      try {
        // Obtener imagen principal (portada)
        const resultPortada = await ApiPublic("ConsultarPorId_Imagenes", {
          id: id,
          categoria: "portada",
          carpeta: "Consola",
        });

        if (resultPortada) {
          const keys = Object.keys(resultPortada);
          if (keys.length > 0) {
            setPortadaUrl(resultPortada[keys[0]]);
          }
        }

        // Obtener imágenes auxiliares (visuales)
        const resultVisuales = await ApiPublic("ConsultarPorId_Imagenes", {
          id: id,
          categoria: "visuales",
          carpeta: "Consola",
        });

        if (resultVisuales) {
            const urls: string[] = Object.values(resultVisuales);   
          setAuxiliaresUrls(urls);
        }

      } catch (error) {
        console.error("Error al obtener imágenes:", error);
      }
    };

    if (id) getImagenes();
  }, [id]);

  return (
    <article className="imagenesConsola">
      <div className="imagenesConsola-auxiliares">
        {auxiliaresUrls.map((src, i) =>
          src ? <img key={i} src={src} alt={`visual ${i}`} /> : "nada"
        )}
      </div>
      <div className="imagenesConsola-principal">
        {portadaUrl && <img src={portadaUrl} alt="portada" />}
      </div>
    </article>
  );
}

export default ImagenesConsola