//css
import "../../../styles/admin/stylesAdmin.css"
//components
import Table from '../../../components/Admin/Facturas/FormaPagos/table'
import Filter from '../../../components/Admin/Facturas/FormaPagos/filter';

const FormaPago = () => {
  return (
      <main className="mainTabla">
        <Filter/>
        <Table/>
      </main>
  )
}
export default FormaPago;  