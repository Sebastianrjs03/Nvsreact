import "../../styles/DetallesProducto/galeriaVideoJuego.css";

const trailers = import.meta.glob(
  "../../assets/Videojuegos/Trailers/*.mp4",
  { eager: true }
);

const posters = import.meta.glob(
  "../../assets/Videojuegos/Banners/*.jpg",
  { eager: true }
);

const visuales = import.meta.glob(
  "../../assets/Videojuegos/visualesVideojuego/*.jpg",
  { eager: true }
);

const getVideo = (id: string) =>
  (trailers[`../../assets/Videojuegos/Trailers/${id}.mp4`] as { default: string })?.default;

const getPoster = (id: string) =>
  (posters[`../../assets/Videojuegos/Banners/${id}.jpg`] as { default: string })?.default;

const getVisual = (id: string, index: number) =>
  (visuales[`../../assets/Videojuegos/visualesVideojuego/visual${index}_${id}.jpg`] as { default: string })?.default;

type GaleriaVideoJuegoProps = {
  visuales: string;
};

function GaleriaVideoJuego({ visuales }: GaleriaVideoJuegoProps) {
  const trailerSrc = getVideo(visuales);
  const posterSrc = getPoster(visuales);
  const visualImages = [1, 2, 3].map((i) => getVisual(visuales, i));

  return (
    <section className="galeriaVideoJuego">
      <h2>Visuales</h2>
      <div className="galeriaVideoJuego-visuales">
        <div className="galeriaVideoJuego-video">
          <video src={trailerSrc} controls muted autoPlay poster={posterSrc}></video>
        </div>
        <div className="galeriaVideoJuego-imagenes">
          {visualImages.map((src, i) => (
            <img key={i} src={src} alt={`Visual ${i + 1}`} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default GaleriaVideoJuego;
