//css
import "../../../styles/admin/stylesAdmin.css"

//components
import Table from '../../../components/Admin/Productos/Plataforma/table';
import FiltroDinamico from "../../../components/Admin/Productos/Producto/filtroProductos";

//Types
import { EstructuraFiltro, Plataforma } from "../../../components/Admin/Types/TypesDatos";

//hooks
import { ApiPublic } from "../../../hooks/UseFetch";
import { useEffect, useState } from "react";


const PlataformaEstructura: EstructuraFiltro = {
  nombrePlataforma: "text",
  stock: {
    tipo: "select",
    opciones: ["Activo", "Inactivo"],
  },
}

const PlataformaPage = () => {

  const [Filtrar, setFiltrar] = useState({});
  const [dataP, setDataP] = useState<Plataforma[]>([]);

  const get = async () => {
    if (Object.keys(Filtrar).length === 0) {
      const result = await ApiPublic("Consultar_Plataforma");
      if (result) {
        setDataP(result);
      } else {
        console.error('No se recibieron datos o los datos están en un formato inesperado');
      }
    } else {
      const result = await ApiPublic("Consultar_PlataformaFiltrados", Filtrar);
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
      <FiltroDinamico estructura={PlataformaEstructura} setFiltrar={setFiltrar} />
      <Table data={dataP} getPlataforma={get} />
    </main>
  )
}
export default PlataformaPage;  