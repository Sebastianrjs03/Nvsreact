import "../../styles/Carrito/ResumenCarrito.css";
import { Link} from 'react-router-dom';

type ResumenCarritoProps = { children: React.ReactNode };

function ResumenCarrito({ children }: ResumenCarritoProps) {

  return (
    <aside className="resumenCarrito-aside">
      <h2 className="resumenCarrito-titulo">Resumen</h2>
      <div className="resumenCarrito-contenido">
        {children}
        <Link to="/" className="resumenCarrito-continuarCompra">
          <span>Volver a la tienda</span>
          <i className="fa-solid fa-chevron-right"></i>
        </Link>
   
      </div>
    </aside>
  );
}

export default ResumenCarrito;
