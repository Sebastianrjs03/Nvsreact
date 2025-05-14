import '../../styles/Carrito/MenuCarrito.css'
import logo from '../../assets/logoNVS.svg'



function MenuPagos() {
  return (
    <header className="menuCarrito-header">

      <nav className="menuCarrito-nav">

        <div className="menuCarrito-progresoCompra">
          <img src={logo} alt="Logo de NVS" />
          <ul className="menuCarrito-pasos">
            <li className="menuCarrito-activo">
              <span>1</span> Carrito
            </li>
            <li className="menuCarrito-inactivo">
              <span>2</span> Pago y Envío
            </li>
          </ul>
        </div>


      </nav>
    </header>


  );
}

export default MenuPagos;

