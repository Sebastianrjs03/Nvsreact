//css
import "../../../styles/admin/stylesAdmin.css";

//components
import Table from '../../../components/Admin/Soporte/table'
import FiltroDinamico from '../../../components/Admin/Productos/Producto/filtroProductos';

//hooks
import { useEffect, useState } from "react";
import { ApiPublic } from "../../../hooks/UseFetch";

//types
import { ClienteCon , EstructuraFiltro, Soporte} from "../../../components/Admin/Types/TypesDatos";

const SoportePage = () => {
  const [Filtrar, setFiltrar] = useState({});
  const [dataP, setDataP] = useState<Soporte[]>([]);
  const [cliente, setCliente] = useState<ClienteCon[]>([]);

  const getCliente = async () => {
    const result = await ApiPublic("Consultar_ClienteConUsuario");
    if (result) {
      setCliente(result);
    } else {
      console.error('No se recibieron datos o los datos están en un formato inesperado');
    }
  };

  useEffect(() => {
    getCliente();
  }, []);

  const estructuraUsuario: EstructuraFiltro = {
    idCliente: {
        tipo: "select",
        opciones: cliente.map(t => t.idCliente)
      },
    fecha: "date",
    Pregunta_Queja_Reclamo: "text",
  };

  const get = async () => {
    if (Object.keys(Filtrar).length === 0) {
      const result = await ApiPublic("Consultar_Soporte");
      if (result) {
        setDataP(result);
      } else {
        console.error('No se recibieron datos o los datos están en un formato inesperado');
      }
    } else {
      const result = await ApiPublic("Consultar_SoporteFiltrados", Filtrar);
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
      <FiltroDinamico estructura={estructuraUsuario} setFiltrar={setFiltrar} />
      <Table data={dataP} cliente={cliente} getSoporte={get} />
    </main>
  );
};

export default SoportePage;