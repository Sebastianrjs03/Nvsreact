//css
import "../../../styles/admin/stylesAdmin.css"
//components
import Table from '../../../components/Admin/Productos/Genero/table'
import FiltroDinamico from '../../../components/Admin/Productos/Producto/filtroProductos';
//hooks
import { useState } from "react";
//types
import { EstructuraFiltro } from "../../../components/Admin/Productos/Producto/filtroProductos";

const Producto:EstructuraFiltro = {
    idProducto: "number",
    nombreProducto: "text",
    precioMin: "number",
    precioMax: "number",
    adminId: "number",
    stock: {
    tipo: "select",
    opciones: ["admin", "cliente", "moderador"],
  },
}

const Juego:EstructuraFiltro = {
  idJuego: "number",
  anoLanzamiento: "date",
  descripcionJuego: "text" ,
}

const Consola:EstructuraFiltro = {
  idConsola: "number",
  sobreConsola: "text",
}

const MostrarProductos = () => {
    const [tipoTabla, setTipoTabla] = useState("Productos");
    const [Filtrar, setFiltrar] = useState<EstructuraFiltro>({});

  return (
      <main className="mainTabla">
        {tipoTabla === "Productos" ?<FiltroDinamico estructura={Producto} setTipoTabla={setTipoTabla} setFiltrar={setFiltrar} tipoTabla={tipoTabla}/> 
        : tipoTabla === "Videojuegos" ? <FiltroDinamico estructura={Juego} setTipoTabla={setTipoTabla} setFiltrar={setFiltrar} tipoTabla={tipoTabla}/> 
        : <FiltroDinamico estructura={Consola} setTipoTabla={setTipoTabla} setFiltrar={setFiltrar} tipoTabla={tipoTabla}/>}
        
        <Table/>
      </main>
  )
}
export default MostrarProductos;  