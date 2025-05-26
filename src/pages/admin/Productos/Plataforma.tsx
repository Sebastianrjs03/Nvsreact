//css
import "../../../styles/admin/stylesAdmin.css"
//components
import Table from '../../../components/Admin/Productos/Plataforma/table'
import Filter from '../../../components/Admin/Productos/Plataforma/filter';

const Plataforma = () => {
  return (
      <main className="mainTabla">
        <Filter/>
        <Table/>
      </main>
  )
}
export default Plataforma;  