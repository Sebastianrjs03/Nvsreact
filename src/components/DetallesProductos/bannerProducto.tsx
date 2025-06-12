import { useEffect, useState } from "react";
import { ApiPublic } from "../../hooks/UseFetch";

import "../../styles/Tienda/Banner.css";

const imagenesRecorte = import.meta.glob("../../assets/Recortes/*.png", {
  eager: true,
});

const getImage = async (id: string) => {
  if (!id) return;

  try {
    const resultBanner = await ApiPublic("ConsultarPorId_Imagenes", {
      id: id,
      categoria: "banner",
      carpeta: "Videojuego",
    });

    if (resultBanner) {
      const keys = Object.keys(resultBanner);
      if (keys.length > 0) {
        const rutaLocal = resultBanner[keys[0]];
        const urlPublica = rutaLocal
          .replace("c:\\xampp\\htdocs\\api-php", "http://localhost/api-php")
          .replace(/\\/g, "/");

        return urlPublica;
      }
    }
  } catch (error) {
    console.error("Error al obtener imágenes:", error);
  }
};

const getImageRecorte = (name: string) => {
  return (
    imagenesRecorte[`../../assets/Recortes/recorte${name}.png`] as {
      default: string;
    }
  )?.default;
};

type BannerProps = {
  Imagen: string;
  Recorte: string;
};

function BannerProducto({ Imagen, Recorte }: BannerProps) {
  const [imagenBannerUrl, setImagenBannerUrl] = useState<string | null>(null);
  const imagenRecorte = getImageRecorte(Recorte);

  useEffect(() => {
    const fetchBanner = async () => {
      const url = await getImage(Imagen);
      if (url) setImagenBannerUrl(url);
    };
    fetchBanner();
  }, [Imagen]);

  return (
    <header className="banner-header">
      {imagenBannerUrl && <img className="banner-imagen" src={imagenBannerUrl} alt="Banner" />}
      {imagenRecorte && <img className="Banner-corte-morado" src={imagenRecorte} alt="Recorte" />}
    </header>
  );
}

export default BannerProducto;