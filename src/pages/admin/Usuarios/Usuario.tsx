//css
import "../../../styles/admin/stylesAdmin.css"
//components
import Table from '../../../components/Admin/Usuarios/Usuario/table'
import Filter from '../../../components/Admin/Usuarios/Usuario/filter';

const Usuario = () => {
  return (
      <main className="mainTabla">
        <Filter/>
        <Table/>
      </main>
  )
}
export default Usuario;  