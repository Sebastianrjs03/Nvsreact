//css
import '@css/admin/stylesadmin.css'
//components
import Table from '@components/Admin/Calificaciones/Cal_Pro_Cli/table'
import Filter from '@components/Admin/Calificaciones/Cal_Pro_Cli/filter';

const Calificacion_Cli_Pro = () => {
  return (
      <main>
        <Filter/>
        <Table/>
      </main>
  )
}
export default Calificacion_Cli_Pro; 