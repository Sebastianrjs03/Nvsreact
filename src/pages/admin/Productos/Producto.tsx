//css
import "../../../styles/admin/stylesAdmin.css"
//components
import TableP from '../../../components/Admin/Productos/Producto/table'
import FiltroDinamico from '../../../components/Admin/Productos/Producto/filtroProductos';
//hooks
import { useEffect, useState } from "react";
import { ApiPublic } from "../../../hooks/UseFetch";
//types
import { EstructuraFiltro } from "../../../components/Admin/Types/TypesDatos";
import { ProductoA } from '../../../components/Admin/Types/TypesDatos';

const Producto: EstructuraFiltro = {
    idProducto: "number",
    nombreProducto: "text",
    precioMin: "number",
    precioMax: "number",
    ID_Administrador: "number",
    Tipo_Producto: {
        tipo: "select",
        opciones: ["Videojuego", "Consola"],
    },
    Disponibles: {
        tipo: "select",
        opciones: ["0 a 10 unidades",
        "10 a 20 unidades",
        "20 a 50 unidades",
        "50 a 100 unidades",
        ...Array.from({ length: 4 }, (_, i) => `${100 * (i + 1)} a ${100 * (i + 2)} unidades`),
        "500 a 1000 unidades",
        "1000 +unidades"
        ],
    },
    Vendidas: {
        tipo: "select",
        opciones: ["0 a 10 unidades",
        "10 a 20 unidades",
        "20 a 50 unidades",
        "50 a 100 unidades",
        ...Array.from({ length: 4 }, (_, i) => `${100 * (i + 1)} a ${100 * (i + 2)} unidades`),
        "500 a 1000 unidades",
        "1000 +unidades"
        ],
    },
}

const MostrarProductos = () => {
    const [Filtrar, setFiltrar] = useState({});
    const [dataP, setDataP] = useState<ProductoA[]>([]);

    const get = async () => {
        if (Object.keys(Filtrar).length === 0) {
        const result = await ApiPublic("Consultar_Producto");
            if (result) {
                setDataP(result);
            } else {
                console.error('No se recibieron datos o los datos están en un formato inesperado');
            }  
        } else {
            const result = await ApiPublic("Consultar_ProductosFiltrados",Filtrar);
            if (result) {
                setDataP(result);
            } else {
                console.error('No se recibieron datos o los datos están en un formato inesperado');
            }
        }
    };

    useEffect(() => {
        get();
    }, [Filtrar]);

    return (
        <main className="mainTabla">
            <FiltroDinamico estructura={Producto} setFiltrar={setFiltrar} />
            <TableP data={dataP} getProducto={get} />
        </main>
    )
}
export default MostrarProductos;  