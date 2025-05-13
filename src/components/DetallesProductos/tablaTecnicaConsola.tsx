import "../../styles/DetallesProducto/tablaTecnicaConsola.css"


function TablaTecnicaConsola() {
    return (

        <section className="tablaTecnicaConsola">
            <h1>Especificaciones técnicas</h1>
            <table>
                <tr>
                    <td className="tablaTecnicaConsola-tituloTabla">Color</td>
                    <td>Blanco</td>
                </tr>
                <tr>
                    <td className="tablaTecnicaConsola-tituloTabla">Tipo de Controles</td>
                    <td>DualSense</td>
                </tr>
                <tr>
                    <td className="tablaTecnicaConsola-tituloTabla">Controles incluidos</td>
                    <td>1</td>
                </tr>
                <tr>
                    <td className="tablaTecnicaConsola-tituloTabla">Controles que Soporta</td>
                    <td>4</td>
                </tr>
                <tr>
                    <td className="tablaTecnicaConsola-tituloTabla">Procesador</td>
                    <td>AMD Ryzen Zen 2 (8 núcleos | 16 hilos | 3,5 GHz)</td>
                </tr>
                <tr>
                    <td className="tablaTecnicaConsola-tituloTabla">Resolución</td>
                    <td>4K | hasta 120 FPS</td>
                </tr>
                <tr>
                    <td className="tablaTecnicaConsola-tituloTabla">Alimentación</td>
                    <td>SSD de 1 TB | 5,5 GB/s</td>
                </tr>
                <tr>
                    <td className="tablaTecnicaConsola-tituloTabla">Conectividad</td>
                    <td>Wi-Fi Bluetooth: 2.1 Ethernet</td>
                </tr>
                <tr>
                    <td className="tablaTecnicaConsola-tituloTabla">Puertos</td>
                    <td>Puerto de salida HDMI™ (salida HDR compatible) 2x...</td>
                </tr>
            </table>
        </section>



    );
}

export default TablaTecnicaConsola;