import '../styles/Banner.css';

function Cards() {

    return(
        <header className="banner-header">
        <img className="banner-imagen" src="imagenes/tienda/inicio/banner.jpg" alt=""/>
        <p className="banner-titulo">Marvel´s Spider-Man: Miles Morales </p>
        <div className="banner-contenedor-informacion2">
          <div>
            <a className="boton-informacion color-boton-banner" href="">INFO</a>
          </div>
          <div>
            <p className="texto-descuento">$4.000.000</p>
            <p className="texto-precio">$3.500.000</p>
          </div>
        </div>
        <img className="corte-morado" src="imagenes/tienda/inicio/cortes/corteMorado.png" alt=""/>
      </header>
    );
}

export default Cards;