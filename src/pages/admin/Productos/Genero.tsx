//css
import "../../../styles/admin/stylesAdmin.css"

//components
import Table from '../../../components/Admin/Productos/Genero/table';
import FiltroDinamico from "../../../components/Admin/Productos/Producto/filtroProductos";

//Types
import { EstructuraFiltro, Genero } from "../../../components/Admin/Types/TypesDatos";

//hooks
import { ApiPublic } from "../../../hooks/UseFetch";
import { useEffect, useState } from "react";


const GeneroEstructura: EstructuraFiltro = {
  nombreGenero: "text",
  stock: {
    tipo: "select",
    opciones: ["Activo", "Inactivo"],
  },
}

const GeneroPage = () => {

  const [Filtrar, setFiltrar] = useState({});
  const [dataP, setDataP] = useState<Genero[]>([]);

  const get = async () => {
    if (Object.keys(Filtrar).length === 0) {
      const result = await ApiPublic("Consultar_Genero");
      if (result) {
        setDataP(result);
      } else {
        console.error('No se recibieron datos o los datos están en un formato inesperado');
      }
    } else {
      const result = await ApiPublic("Consultar_GeneroFiltrados", Filtrar);
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
      <FiltroDinamico estructura={GeneroEstructura} setFiltrar={setFiltrar} />
      <Table data={dataP} getGenero={get} />
    </main>
  )
}
export default GeneroPage;  