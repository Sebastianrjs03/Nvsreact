//hooks
import { useEffect, useState } from "react";
import { ApiPublic, ApiPrivate } from '../../../../hooks/UseFetch.tsx';

//librerias
import Swal from 'sweetalert2';

//Components
import ExampleModal from "./modalUsuario.tsx";
import { DetaFactura, ProductoA , FPC } from "../../Types/TypesDatos.tsx";

interface MyModalProps {
  getFactura: () => void;
  data: DetaFactura[];
}

const Table = ({ getFactura, data } : MyModalProps) => {

  const [dataP, setDataP] = useState<ProductoA[]>([]);
  const [selectedFactura, setSelectedFactura] = useState<DetaFactura | null>(null);
  const [isOpen, setIsOpen] = useState(false);


  const getProducto = async () => {
    const resultP = await ApiPublic("Consultar_Producto");
    if (resultP) {
      setDataP(resultP);
    } else {
      console.error('No se recibieron datos o los datos están en un formato inesperado');
    }
  };

  useEffect(() => {
    getProducto();
  }, []);

  const Delete = (idFactura: number, idProducto: number) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esto',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        const PK = {
          id1: idFactura,
          id2: idProducto,
          nombre1: "fk_pk_Factura",
          nombre2: "fk_pk_Producto"
        }
        deleteFetch(PK);
      }
    });
  };

  const deleteFetch = async (PK: any) => {
    const response = await ApiPrivate('Eliminar_DetalleFactura', PK)
    if (response) {
      Swal.fire('Eliminado', 'Los Detalles Factura han sido eliminados.', 'success');
      getFactura();
    } else {
      Swal.fire({
        icon: "error",
        title: "Acción fallida",
        text: "No se elimino el Detalle Factura",
      });
    }
  }

const Tabla = Array.isArray(data)
  ? data.map(Fac => {
      const seleccionado = dataP.find(Pro => Pro.idProducto === Fac.fk_pk_Producto);
      return {
        ...Fac,
        nomProducto: seleccionado ? seleccionado.nombreProducto : null
      };
    })
  : [];

  return (
    <div style={{display: "flex" ,flexDirection: "column", alignItems: "center" ,gap: "10px"}}>
      <div className="contenedor_Tabla" style={{width: "100%"}}>
        <table className="table table-striped table-dark table_Admin">
          <thead>
            <tr>
              <th scope="col">Id Factura</th>
              <th scope="col" style={{ maxWidth: "150px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Nombre Producto</th>
              <th scope="col">Cantidad Productos</th>
              <th scope="col">Valor Unitario</th>
              <th scope="col">Total</th>
              <th scope="col" style={{ maxWidth: "30px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Editar</th>
              <th scope="col" style={{ maxWidth: "25px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {Tabla.map((detaFac) => (
              <tr key={`${detaFac.fk_pk_Factura}-${detaFac.fk_pk_Producto}`}>
                <td>{detaFac.fk_pk_Factura}</td>
                <td style={{ maxWidth: "150px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{detaFac.nomProducto}</td>
                <td>{detaFac.cantidadProducto}</td>
                <td>{FPC.format(detaFac.valorUnitarioProducto)}</td>
                <td>{FPC.format(detaFac.totalProducto)}</td>
                <td style={{ maxWidth: "30px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => { setSelectedFactura(detaFac); setIsOpen(true) }}
                  >
                    <i className="fa-solid fa-pen"></i>
                  </button>


                </td>
                <td style={{ maxWidth: "25px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  <button className="btn btn-danger" onClick={() => Delete(detaFac.fk_pk_Factura, detaFac.fk_pk_Producto)}>
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </td>
              </tr>))}

          </tbody>
        </table>
      </div>
      <div>
        <section>
          <button
            type="button"
            className="btn btn-primary"
            style={{ backgroundColor: '#4415A2', border: 'none' }}
            onClick={() => setIsOpen(true)}
          >
            <i className="fa-solid fa-plus"></i> Nuevos Detalles Factura
          </button>
          {isOpen && !selectedFactura && (
            <ExampleModal
              setIsOpen={setIsOpen}
              modal="Agregar"
              get={getFactura}
            />
          )}
          {isOpen && selectedFactura && (
            <ExampleModal
              idFactura={selectedFactura.fk_pk_Factura}
              idProducto={selectedFactura.fk_pk_Producto}
              setFacturaB={setSelectedFactura}
              setIsOpen={setIsOpen}
              modal="Editar"
              get={getFactura}
            />
          )}
        </section>
      </div>
    </div>
  )

}

export default Table