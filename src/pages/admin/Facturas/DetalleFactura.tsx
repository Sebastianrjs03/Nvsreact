//css
//css
import "../../../styles/admin/stylesAdmin.css"
//components
import Table from '../../../components/Admin/Facturas/DetallesFactura/table'
import FiltroDinamico from '../../../components/Admin/Productos/Producto/filtroProductos';
//hooks
import { useEffect, useState } from "react";
import { ApiPublic } from "../../../hooks/UseFetch";
//types
import { EstructuraFiltro, ProductoA, DetaFactura, Factura } from "../../../components/Admin/Types/TypesDatos";

const DetallesFacturaPage = () => {
  const [Filtrar, setFiltrar] = useState({});
  const [dataP, setDataP] = useState<DetaFactura[]>([]);
  const [producto, setProducto] = useState<ProductoA[]>([]);
  const [factura, setFactura] = useState<Factura[]>([]);

  const getProductoFactura = async () => {
    const result = await ApiPublic("Consultar_Producto");
    const resultF = await ApiPublic("Consultar_Factura");
    if (result && resultF) {
      setProducto(result);
      setFactura(resultF);
    } else {
      console.error('No se recibieron datos o los datos están en un formato inesperado');
    }
  };

  useEffect(() => {
    getProductoFactura();
  }, []);

  const estructuraDetallesFactura: EstructuraFiltro = {
    idFactura: {
      tipo: "select",
      opciones: factura.map(t => t.idFactura)
    },
    idProducto: {
      tipo: "select",
      opciones: producto.map(t => t.idProducto)
    },
    valorUni_Minimo: "number",
    valorUni_Maximo: "number",
    totalMinimo: "number",
    totalMaximo: "number",

  };

  const get = async () => {
    if (Object.keys(Filtrar).length === 0) {
      const result = await ApiPublic("Consultar_DetalleFactura");
      if (result) {
        setDataP(result);
      } else {
        console.error('No se recibieron datos o los datos están en un formato inesperado');
      }
    } else {
      const result = await ApiPublic("Consultar_DetallesFacturaFiltrados", Filtrar);
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
      <FiltroDinamico estructura={estructuraDetallesFactura} setFiltrar={setFiltrar} />
      <Table data={dataP} getFactura={get} />
    </main>
  );
};

export default DetallesFacturaPage;