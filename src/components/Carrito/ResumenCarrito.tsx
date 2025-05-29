import "../../styles/Carrito/ResumenCarrito.css";
import { Link} from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
type ResumenCarritoProps = { children: React.ReactNode };

function ResumenCarrito({ children }: ResumenCarritoProps) {
  const token = localStorage.getItem("token");
  const rol = localStorage.getItem("rol");
   const Navigate = useNavigate();

  const handleComprar = async () => {

 
  if (!token && rol !== "1") {
    Swal.fire({
      title: "Necesitas iniciar sesión",
      text: "Para completar la compra necesitas iniciar sesión.",
      icon: "warning",
      background: "#2a0054",
      color: "#ffffff",
      iconColor: "#ffcc00",
      cancelButtonColor: "#613f92",
      confirmButtonColor: "#7e4efc",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Ingresar",
      showCancelButton: true,
    }).then((result) => { 
        if (result.isConfirmed) {
            Navigate("/iniciarSesion");
        }
    });
  }else if (token && rol === "1") {
    Navigate("/Pagos");
  }

}

  return (
    <aside className="resumenCarrito-aside">
      <h2 className="resumenCarrito-titulo">Resumen</h2>
      <div className="resumenCarrito-contenido">
        {children}

        <button onClick={handleComprar} className="resumenCarrito-botonPago">
          Comprar
        </button>

        <Link to="/" className="resumenCarrito-continuarCompra">
          <span>Volver a la tienda</span>
          <i className="fa-solid fa-chevron-right"></i>
        </Link>
      </div>
    </aside>
  );
}

export default ResumenCarrito;
