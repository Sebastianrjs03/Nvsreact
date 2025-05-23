import "../../styles/DetallesProducto/imagenesConsola.css";

// Carga todas las imágenes auxiliares y principales dinámicamente
const auxiliares = import.meta.glob(
  "../../assets/Consolas/auxiliares/auxiliar*.jpeg",
  { eager: true }
);

const principales = import.meta.glob(
  "../../assets/Consolas/Portada/*.webp",
  { eager: true }
);

// Devuelve la ruta de una auxiliar en base al id y el número (1, 2, 3)
const getAuxiliar = (id: string, index: number) =>
  (auxiliares[`../../assets/Consolas/auxiliares/auxiliar${index}_${id}.jpeg`] as { default: string })?.default;

// Devuelve la ruta de la imagen principal en base al id
const getPrincipal = (id: string) =>
  (principales[`../../assets/Consolas/Portada/${id}.webp`] as { default: string })?.default;

type ImagenesConsolaProps = {
  imgConsola: string;
};

function ImagenesConsola({ imgConsola }: ImagenesConsolaProps) {
  const auxiliarImages = [1, 2, 3].map((i) => getAuxiliar(imgConsola, i));
  const principalImage = getPrincipal(imgConsola);

  return (
    <article className="imagenesConsola">
      <div className="imagenesConsola-auxiliares">
        {auxiliarImages.map((src, i) =>
          src ? <img key={i} src={src} alt={`auxiliar ${i + 1}`} /> : null
        )}
      </div>
      <div className="imagenesConsola-principal">
        {principalImage && <img src={principalImage} alt="portada" />}
      </div>
    </article>
  );
}

export default ImagenesConsola;
