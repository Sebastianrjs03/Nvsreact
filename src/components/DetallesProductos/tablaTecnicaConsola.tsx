import "../../styles/DetallesProducto/tablaTecnicaConsola.css"

type TablaTecnicaProps = {

    colorConsola: string;
    tipoControles: string;
    controles: string;
    controlesSoporta: string;
    procesador: string;
    resolucion: string;
    alimentacion: string;
    conectividad: string;
    puertos: string;

};

function TablaTecnicaConsola({ colorConsola, tipoControles, controles, controlesSoporta, procesador, resolucion, alimentacion, conectividad, puertos  }: TablaTecnicaProps) {
    return (

        <section className="tablaTecnicaConsola">
            <h1>Especificaciones técnicas</h1>
            <table>
                <tr>
                    <td className="tablaTecnicaConsola-tituloTabla">Color</td>
                    <td>{colorConsola}</td>
                </tr>
                <tr>
                    <td className="tablaTecnicaConsola-tituloTabla">Tipo de Controles</td>
                    <td>{tipoControles}</td>
                </tr>
                <tr>
                    <td className="tablaTecnicaConsola-tituloTabla">Controles incluidos</td>
                    <td>{controles}</td>
                </tr>
                <tr>
                    <td className="tablaTecnicaConsola-tituloTabla">Controles que Soporta</td>
                    <td>{controlesSoporta}</td>
                </tr>
                <tr>
                    <td className="tablaTecnicaConsola-tituloTabla">Procesador</td>
                    <td>{procesador}</td>
                </tr>
                <tr>
                    <td className="tablaTecnicaConsola-tituloTabla">Resolución</td>
                    <td>{resolucion}</td>
                </tr>
                <tr>
                    <td className="tablaTecnicaConsola-tituloTabla">Alimentación</td>
                    <td>{alimentacion}</td>
                </tr>
                <tr>
                    <td className="tablaTecnicaConsola-tituloTabla">Conectividad</td>
                    <td>{conectividad}</td>
                </tr>
                <tr>
                    <td className="tablaTecnicaConsola-tituloTabla">Puertos</td>
                    <td>{puertos}</td>
                </tr>
            </table>
        </section>



    );
}

export default TablaTecnicaConsola;