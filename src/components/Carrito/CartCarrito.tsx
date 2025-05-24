import Swal from 'sweetalert2';
import '../../styles/Carrito/CartCarrito.css';
const imagenCarrito = import.meta.glob(
  "../../assets/Consolas/Portada/*.webp",
  { eager: true }
);

const getImage = (name: string) => { 
  return (imagenCarrito[`../../assets/Consolas/Portada/${name}.webp`] as {default: string})?.default; // Si no se encuentra imagen, retorna string vacío o un placeholder
};

type CartCarritoProps = {
  NombreProducto: string;
  Consola: string;
  Precio: string;
  stock: number;
  imagen: string;
  onDelete: () => void; // 👈 nuevo prop
};

function CartCarrito({ NombreProducto, Consola, Precio, stock, imagen, onDelete }: CartCarritoProps) {
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
      cancelButtonColor: '#7e4efc',
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
        onDelete(); // 🔥 Eliminar del localStorage desde el padre
        Swal.fire({
          title: 'Eliminado',
          text: 'El producto fue eliminado del carrito.',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false,
          background: '#2a0054',
          color: '#ffffff',
          iconColor: '#facc15',
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
      <img src={imagenPortada} alt="EA Sports FC 24" />
      <div className="cartCarrito-infoProducto">
        <h3>{NombreProducto}</h3>
        <p>{Consola}</p>
        <span>{precioFormateado}</span>
      </div>
      <div>
        <select>
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
