//css
import "../../../styles/admin/stylesAdmin.css"
//components
import Table from '../../../components/Admin/Productos/Genero/table'
import Filter from '../../../components/Admin/Productos/Genero/filter';

const Genero = () => {
  return (
      <main className="mainTabla">
        <Filter/>
        <Table/>
      </main>
  )
}
export default Genero;  