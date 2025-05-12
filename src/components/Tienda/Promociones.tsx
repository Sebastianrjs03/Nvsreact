import "../../styles/Tienda/Promociones.css";
const imagenes = import.meta.glob('../../assets/Promociones/*.png', { eager: true });

const getImage = (name: string) => {
    return (imagenes[`../../assets/Promociones/${name}.png`] as { default: string })?.default;
  };

type PromocionesProps = {
  consola: string;
  Imagen: string;
  ImagenConsola: string;
};

function Promociones({consola, Imagen, ImagenConsola}: PromocionesProps) {


  let color;

  switch (consola) {
    case "xbox":
      color = "xboxProm";
      break;
    case "play":
      color = "playProm";
      break;
    case "nintendo":
      color = "nintendoProm";
      break;
  }

  const contenedorInicio = `promociones-cont ${color}`;

  const ImagenSrc = getImage(Imagen);
  const ImagenConsolaSrc = getImage(ImagenConsola);

  return (
    <section className={contenedorInicio}> 
      <div className="promociones-precio">
        <img
          className="promociones-imagen-marca"
          src={ImagenSrc}
          alt=""
        />
        <div className="promociones-texto">
          <div>
            <a className="promociones-boton-info" href="">
              INFO
            </a>
          </div>
          <div>
            <p className="promociones-texto-descuento">$4.000.000</p>
            <p className="promociones-texto-precio">$3.500.000</p>
          </div>
        </div>
      </div>
      <div className="promociones-consola">
        <img
          className="promociones-imagen-consola"
          src={ImagenConsolaSrc}
          alt=""
        />
      </div>
    </section>
  );
}

export default Promociones;
