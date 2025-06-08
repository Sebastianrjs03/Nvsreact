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
    stock: {
        tipo: "select",
        opciones: ["Activo", "Inactivo"],
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