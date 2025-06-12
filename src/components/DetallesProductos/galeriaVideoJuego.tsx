import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ApiPublic } from "../../hooks/UseFetch";
import "../../styles/DetallesProducto/galeriaVideoJuego.css";

function GaleriaVideoJuego() {
  const { id } = useParams();
  const [trailerUrl, setTrailerUrl] = useState<string>("");
  const [visualesUrls, setVisualesUrls] = useState<string[]>([]);

  useEffect(() => {
    const getImagenesVideojuego = async () => {
      if (!id) return;

      try {
        const normalizaRuta = (ruta: string) =>
          ruta
            .replace("c:\\xampp\\htdocs\\api-php", "http://localhost/api-php")
            .replace(/\\/g, "/");

        const [resTrailer, resVisuales] = await Promise.all([
          ApiPublic("ConsultarPorId_Imagenes", { id, categoria: "trailer", carpeta: "Videojuego" }),
          ApiPublic("ConsultarPorId_Imagenes", { id, categoria: "visuales", carpeta: "Videojuego" }),
        ]);

        // Trailer
        if (resTrailer && Object.keys(resTrailer).length > 0) {
          const key = Object.keys(resTrailer)[0];
          const valor = resTrailer[key];
          if (valor) setTrailerUrl(normalizaRuta(valor));
        }

        // Visuales
        if (resVisuales) {
          const urls = (Object.values(resVisuales) as string[]).map(normalizaRuta);
          setVisualesUrls(urls);
        }
      } catch (error) {
        console.error("Error al cargar imágenes del videojuego:", error);
      }
    };

    getImagenesVideojuego();
  }, [id]);

  return (
    <section className="galeriaVideoJuego">

      <h2>Visuales</h2>

      <div className="galeriaVideoJuego-visuales">
        {/* Trailer */}
        <div className="galeriaVideoJuego-video">
          {trailerUrl ? (
            <video src={trailerUrl} controls muted autoPlay></video>
          ) : (
            <p>Tráiler no disponible</p>
          )}
        </div>

        {/* Visuales */}
        <div className="galeriaVideoJuego-imagenes">
          {visualesUrls.length > 0 ? (
            visualesUrls.map((src, i) => <img key={i} src={src} alt={`Visual ${i + 1}`} />)
          ) : (
            <p>No hay visuales disponibles.</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default GaleriaVideoJuego;
