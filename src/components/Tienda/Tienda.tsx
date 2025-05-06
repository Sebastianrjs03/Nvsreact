import '../../styles/Tienda/Tienda.css';


type TiendaProps = {
    children: React.ReactNode;
}

function Tienda({children}: TiendaProps) {

    return(
    <section className="Tienda-contenedor">
        {children}
    </section>
    );
}

export default Tienda;