//css
import "../../../styles/admin/stylesAdmin.css"
//components
import Table from '../../../components/Admin/Facturas/DetallesFactura/table'
import Filter from '../../../components/Admin/Facturas/DetallesFactura/filter';

const DetallesFactura = () => {
  return (
      <main className="mainTabla">
        <Filter/>
        <Table/>
      </main>
  )
}
export default DetallesFactura;  