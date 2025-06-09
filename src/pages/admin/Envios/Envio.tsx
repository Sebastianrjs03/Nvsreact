//css
import "../../../styles/admin/stylesAdmin.css"

//components
import Table from '../../../components/Admin/Envios/table'
import FiltroDinamico from '../../../components/Admin/Productos/Producto/filtroProductos';

//hooks
import { useEffect, useState } from "react";
import { ApiPublic } from "../../../hooks/UseFetch";

//types
import { EstructuraFiltro, EstadoEnvio, Envio, Factura } from "../../../components/Admin/Types/TypesDatos";

const EnvioPage = () => {
  const [Filtrar, setFiltrar] = useState({});
  const [dataP, setDataP] = useState<Envio[]>([]);
  const [estadoEnvio, setEstadoEnvio] = useState<EstadoEnvio[]>([]);
  const [factura, setFactura] = useState<Factura[]>([]);

  const getProductoFactura = async () => {
    const result = await ApiPublic("Consultar_EstadoEnvio");
    const resultF = await ApiPublic("Consultar_Factura");
    if (result && resultF) {
      setEstadoEnvio(result);
      setFactura(resultF);
    } else {
      console.error('No se recibieron datos o los datos están en un formato inesperado');
    }
  };

  useEffect(() => {
    getProductoFactura();
  }, []);

  const estructuraEnvios: EstructuraFiltro = {
    idFactura: {
      tipo: "select",
      opciones: factura.map(t => t.idFactura)
    },
    tiempoEstimado: "text",
    Observaciones: "text",
    Estado_Envio: {
      tipo: "select",
      opciones: estadoEnvio.map(t => t.idEstadoEnvio)
    }
  };

  const get = async () => {
    if (Object.keys(Filtrar).length === 0) {
      const result = await ApiPublic("Consultar_EnvioAdmin");
      if (result) {
        setDataP(result);
      } else {
        console.error('No se recibieron datos o los datos están en un formato inesperado');
      }
    } else {
      const result = await ApiPublic("Consultar_EnvioAdminFiltrados", Filtrar);
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
      <FiltroDinamico estructura={estructuraEnvios} setFiltrar={setFiltrar} />
      <Table data={dataP} getEnvios={get} />
    </main>
  );
};

export default EnvioPage;