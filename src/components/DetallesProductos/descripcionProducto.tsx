import "../../styles/DetallesProducto/descripcionProducto.css"

type DescripcionProps = {
  descripcion: string;
  añoLanzamiento: string;
  generos:string

};


function DescripcionProducto({descripcion, añoLanzamiento, generos}: DescripcionProps) {
    return (

        <section className="descripcionProducto">

            <h2>Sobre el Producto</h2>

            <div>

                <p>
                    {descripcion}
                </p>

            </div>

             <div>

                <h2>Año de lanzamineto:</h2>

                <p>
                {añoLanzamiento}
                </p>

            </div>

            <div>

                 <h2>Generos:</h2>

                <p>
                {generos}
                </p>

            </div>

        </section>



    );
}

export default DescripcionProducto;
