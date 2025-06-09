//css
import "../../../styles/admin/stylesAdmin.css"
//components
import Table from '../../../components/Admin/Usuarios/Usuario/table'
import FiltroDinamico from '../../../components/Admin/Productos/Producto/filtroProductos';
//hooks
import { useEffect, useState } from "react";
import { ApiPublic } from "../../../hooks/UseFetch";
//types
import { EstructuraFiltro } from "../../../components/Admin/Types/TypesDatos";
import { Usuario } from '../../../components/Admin/Types/TypesDatos';

const UsuarioPage = () => {
  const [Filtrar, setFiltrar] = useState({});
  const [dataP, setDataP] = useState<Usuario[]>([]);
  const [usuario, setUsuario] = useState<Usuario[]>([]);

  const getUsuario = async () => {
    const result = await ApiPublic("Consultar_UsuarioAdmin");
    if (result) {
      setUsuario(result);
    } else {
      console.error('No se recibieron datos o los datos están en un formato inesperado');
    }
  };

  useEffect(() => {
    getUsuario();
  }, []);

  const estructuraUsuario: EstructuraFiltro = {
    idUsuario: {
        tipo: "select",
        opciones: usuario.map(t => t.idUsuario)
      },
    nombreUsuario: "text",
    apellidoUsuario: "text",
    correoUsuario: "email",
    celularUsuario: "number",
    idRol: {
        tipo: "select",
        opciones: ["1","2"]
      },
  };

  const get = async () => {
    if (Object.keys(Filtrar).length === 0) {
      const result = await ApiPublic("Consultar_UsuarioAdmin");
      if (result) {
        setDataP(result);
      } else {
        console.error('No se recibieron datos o los datos están en un formato inesperado');
      }
    } else {
      const result = await ApiPublic("Consultar_UsuarioAdminFiltrados", Filtrar);
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
      <FiltroDinamico estructura={estructuraUsuario} setFiltrar={setFiltrar} />
      <Table data={dataP} getUsuario={get} />
    </main>
  );
};

export default UsuarioPage;