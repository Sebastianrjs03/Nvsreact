import "../../styles/DetallesProducto/descripcionProducto.css"

type DescripcionProps = {
    descripcion: string;
    añoLanzamiento: string;
    generos: string;
    tipoProducto: string;
};


function DescripcionProducto({ descripcion, añoLanzamiento, generos, tipoProducto }: DescripcionProps) {
    return (

        <section className="descripcionProducto">

            <h2>Sobre el Producto</h2>

            <div>

                <p>
                    {descripcion}
                </p>

            </div>
            {
                tipoProducto == 'videojuego' && (
                    <div>


                        <h2>Año de lanzamineto:</h2>

                        <p>
                            {añoLanzamiento}
                        </p>



                    </div>
                )}
            {
                tipoProducto == 'videojuego' && (
                    <div>


                        <h2>Generos:</h2>

                        <p>
                            {generos}
                        </p>

                    </div>
                )}

        </section>



    );
}

export default DescripcionProducto;
