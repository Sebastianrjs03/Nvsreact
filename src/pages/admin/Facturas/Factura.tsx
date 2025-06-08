//css
import "../../../styles/admin/stylesAdmin.css"
//components
import Table from '../../../components/Admin/Facturas/Factura/table'
import FiltroDinamico from '../../../components/Admin/Productos/Producto/filtroProductos';
//hooks
import { useEffect, useState } from "react";
import { ApiPublic } from "../../../hooks/UseFetch";
//types
import { EstructuraFiltro } from "../../../components/Admin/Types/TypesDatos";
import { Factura, Cliente } from '../../../components/Admin/Types/TypesDatos';

const FacturaPage = () => {
  const [Filtrar, setFiltrar] = useState({});
  const [dataP, setDataP] = useState<Factura[]>([]);
  const [cliente, setCliente] = useState<Cliente[]>([]);
  const [factura, setFactura] = useState<Factura[]>([]);

  const getClienteFactura = async () => {
    const result = await ApiPublic("Consultar_Cliente");
    const resultF = await ApiPublic("Consultar_Factura");
    if (result && resultF) {
      setCliente(result);
      setFactura(resultF);
    } else {
      console.error('No se recibieron datos o los datos están en un formato inesperado');
    }
  };

  useEffect(() => {
    getClienteFactura();
  }, []);

  // Creamos la estructura aquí para que use los clientes cargados
  const estructuraFactura: EstructuraFiltro = {
    idFactura: {
        tipo: "select",
        opciones: factura.map(t => t.idFactura)
      },
    fechaExacta: "date",
    totalMinimo: "number",
    totalMaximo: "number",
      idCliente: {
        tipo: "select",
        opciones: cliente.map(t => t.idCliente)
      },
  };

  const get = async () => {
    if (Object.keys(Filtrar).length === 0) {
      const result = await ApiPublic("Consultar_Factura");
      if (result) {
        setDataP(result);
      } else {
        console.error('No se recibieron datos o los datos están en un formato inesperado');
      }
    } else {
      const result = await ApiPublic("Consultar_FacturasFiltrados", Filtrar);
      if (result) {
        setDataP(result);
      } else {
        console.error('No se recibieron datos o los datos están en un formato inesperado');
      }
    }
  };

  // Ejecutamos get cuando cambia el filtro
  useEffect(() => {
    get();
  }, [Filtrar]);

  return (
    <main className="mainTabla">
      <FiltroDinamico estructura={estructuraFactura} setFiltrar={setFiltrar} />
      <Table data={dataP} getFactura={get} />
    </main>
  );
};

export default FacturaPage;