import Swal from 'sweetalert2';
import '../../styles/Carrito/CartCarrito.css';

const imagenConsolas = import.meta.glob(
  "../../assets/Consolas/Portada/*.webp",
  { eager: true }
);

const imagenVideojuegos = import.meta.glob(
  "../../assets/Videojuegos/Portada/*.webp",
  { eager: true }
);

const getImage = (name: string) => {
  const pathConsola = `../../assets/Consolas/Portada/${name}.webp`;
  const pathVideojuego = `../../assets/Videojuegos/Portada/${name}.webp`;

  const imagen =
    (imagenConsolas[pathConsola] as { default: string })?.default ||
    (imagenVideojuegos[pathVideojuego] as { default: string })?.default;

  return imagen || ""; 
};



type CartCarritoProps = {
  NombreProducto: string;
  Consola: string;
  Precio: string;
  stock: number;
  imagen: string;
  cantidadSeleccionada: number;
  onCantidadChange: (cantidad: number) => void; 
  onDelete: () => void;
};

function CartCarrito({
  NombreProducto,
  Consola,
  Precio,
  stock,
  imagen,
  cantidadSeleccionada,
  onCantidadChange,
  onDelete
}: CartCarritoProps) {
  const imagenPortada = getImage(imagen);

  const confirmarEliminacion = () => {
    Swal.fire({
      title: '¿Eliminar producto?',
      text: '¿Estás seguro de quitar este producto del carrito?',
      icon: 'warning',
      background: '#2a0054',
      color: '#ffffff',
      iconColor: '#facc15',
      confirmButtonColor: '#7e4efc',
      cancelButtonColor: '#613f92',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
      customClass: {
        popup: 'alerta-violeta',
        title: 'alerta-titulo',
        confirmButton: 'btn-confirmar',
        cancelButton: 'btn-cancelar'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        onDelete();
        Swal.fire({
          title: 'Eliminado',
          text: 'El producto fue eliminado del carrito.',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false,
          background: '#2a0054',
          color: '#ffffff',
          iconColor: '#00a135',
        });
      }
    });
  };

  const precioFormateado = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  }).format(Number(Precio));

  return (
    <div className="cartCarrito">
      <img src={imagenPortada} alt={NombreProducto} />
      <div className="cartCarrito-infoProducto">
        <h3>{NombreProducto}</h3>
        <p>{Consola}</p>
        <span>{precioFormateado}</span>
      </div>
      <div>
        <select
          value={cantidadSeleccionada}
          onChange={(e) => onCantidadChange(Number(e.target.value))}
        >
          {Array.from({ length: stock }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
        <button onClick={confirmarEliminacion} className="cartCarrito-eliminar">
          <i className="fa-solid fa-trash"></i>
        </button>
      </div>
    </div>
  );
}

export default CartCarrito;
