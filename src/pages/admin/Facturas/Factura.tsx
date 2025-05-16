//css
import "../../../styles/admin/stylesAdmin.css"
//components
import Table from '../../../components/Admin/Facturas/Factura/table'
import Filter from '../../../components/Admin/Facturas/Factura/filter';

const Factura = () => {
  return (
      <main className="mainTabla">
        <Filter/>
        <Table/>
      </main>
  )
}
export default Factura;  