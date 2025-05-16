//css
import "../../../styles/admin/stylesAdmin.css"
//components
import Table from '../../../components/Admin/Calificaciones/CalCliente/table'
import Filter from '../../../components/Admin/Calificaciones/CalCliente/filter';

const CalificacionCliente = () => {
  return (
      <main className="mainTabla">
        <Filter/>
        <Table/>
      </main>
  )
}
export default CalificacionCliente;  