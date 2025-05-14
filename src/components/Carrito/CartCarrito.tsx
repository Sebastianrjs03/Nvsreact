import Swal from 'sweetalert2';
import '../../styles/Carrito/CartCarrito.css';

type CartCarritoProps =
    {
        NombreProducto: string;
        Consola: string;
        Precio: string;
    }

function CartCarrito({NombreProducto, Consola, Precio }: CartCarritoProps) {
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
        console.log('Producto eliminado'); 
      }
    });
  };

  return (
    <div className="cartCarrito">
      <img src="../imagenes/carrito/fc24.jpg" alt="EA Sports FC 24" />
      <div className="cartCarrito-infoProducto">
        <h3>{NombreProducto}</h3>
        <p>{Consola}</p>
        <span>{Precio}</span>
      </div>
      <div>
        <select>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
        </select>
        <button onClick={confirmarEliminacion} className="cartCarrito-eliminar">
          <i className="fa-solid fa-trash"></i>
        </button>
      </div>
    </div>
  );
}

export default CartCarrito;
