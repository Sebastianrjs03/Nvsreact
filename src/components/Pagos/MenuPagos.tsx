import '../../styles/Pagos/MenuPagos.css'
import logo from '../../assets/logoNVS.svg'



function MenuCarrito() {
  return (

    <header className="menuPagos-header">

    <nav className="menuPagos-nav">

      <div className="menuPagos-progresoCompra">
        <img src={logo} alt="Logo de NVS"/>
          <ul className="menuPagos-pasos">
            <li className="menuPagos-inactivo"><span><i className="fa-solid fa-check"></i></span> Carrito</li>
            <li className="menuPagos-activo"><span>2</span> Pago y Envío</li>
          </ul>
      </div>


    </nav>
  </header>
  )


}

export default MenuCarrito;

