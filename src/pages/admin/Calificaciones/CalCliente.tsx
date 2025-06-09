//css
//css
import "../../../styles/admin/stylesAdmin.css"
//components
import Table from '../../../components/Admin/Calificaciones/CalCliente/table'
import FiltroDinamico from '../../../components/Admin/Productos/Producto/filtroProductos';
//hooks
import { useEffect, useState } from "react";
import { ApiPublic } from "../../../hooks/UseFetch";
//types
import { EstructuraFiltro, ProductoA, Calificacion, Cliente } from "../../../components/Admin/Types/TypesDatos";

const DetallesFacturaPage = () => {
  const [Filtrar, setFiltrar] = useState({});
  const [dataP, setDataP] = useState<Calificacion[]>([]);
  const [producto, setProducto] = useState<ProductoA[]>([]);
  const [cliente, setCliente] = useState<Cliente[]>([]);

  const getProductoCliente = async () => {
    const result = await ApiPublic("Consultar_Producto");
    const resultF = await ApiPublic("Consultar_Cliente");
    if (result && resultF) {
      setProducto(result);
      setCliente(resultF);
    } else {
      console.error('No se recibieron datos o los datos están en un formato inesperado');
    }
  };

  useEffect(() => {
    getProductoCliente();
  }, []);

  const estructuraCalificacion: EstructuraFiltro = {
    idCliente: {
      tipo: "select",
      opciones: cliente.map(t => t.idCliente)
    },
    idProducto: {
      tipo: "select",
      opciones: producto.map(t => t.idProducto)
    },
    calificacion_Minima: "number",
    calificacion_Maxima: "number",
    comentarioCalificacion: "text",
  };

  const get = async () => {
    if (Object.keys(Filtrar).length === 0) {
      const result = await ApiPublic("Consultar_CalificacionCliente");
      if (result) {
        setDataP(result);
      } else {
        console.error('No se recibieron datos o los datos están en un formato inesperado');
      }
    } else {
      const result = await ApiPublic("Consultar_CalificacionClienteFiltrados", Filtrar);
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
      <FiltroDinamico estructura={estructuraCalificacion} setFiltrar={setFiltrar} />
      <Table data={dataP} getCalifications={get} />
    </main>
  );
};

export default DetallesFacturaPage;