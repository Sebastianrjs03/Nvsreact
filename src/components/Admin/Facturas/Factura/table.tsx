//hooks
import { useEffect, useState } from "react";
import { ApiPublic, ApiPrivate } from '../../../../hooks/UseFetch.tsx';

//librerias
import Swal from 'sweetalert2';

//Components
import ExampleModal from "./modalUsuario.tsx";
import { Factura } from "../../Types/TypesDatos.tsx";

const Table = () => {

  const endpoint: string = 'Consultar_Factura';
  const [data, setData] = useState<Factura[]>([]);
  const [selectedFactura, setSelectedFactura] = useState<Factura | null>(null);
  const [isOpen, setIsOpen] = useState(false);


  const getFactura = async () => {
    const result = await ApiPublic(endpoint);

    if (result) {
      setData(result);
    } else {
      console.error('No se recibieron datos o los datos están en un formato inesperado');
    }
  };

  useEffect(() => {
    getFactura();
  }, []);

  const Delete = ( idFactura: number) => {
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
          nombre1: "idFactura",
        }
        deleteFetch(PK);
      }
    });
  };

  const deleteFetch = async (PK: any) => {
    const response = await ApiPrivate('Eliminar_Factura', PK)
    if (response) {
      Swal.fire('Eliminado', 'La Factura ha sido eliminada.', 'success');
      getFactura();
    } else {
      Swal.fire({
        icon: "error",
        title: "Acción fallida",
        text: "No se elimino la Factura",
      });
    }
  }

  return (
    <div>
      <div className="contenedor_Tabla">
        <table className="table table-striped table-dark table_Admin">
          <thead>
            <tr>
              <th scope="col">Id Factura</th>
              <th scope="col">Stock Forma</th>
              <th scope="col">Editar</th>
              <th scope="col">Eliminar</th>

            </tr>
          </thead>
          <tbody>
            {data.map((Factura) => (
              <tr key={`${Factura.idFactura}`}>
                <td>{Factura.idFactura}</td>
                <td>{Factura.fechaFactura}</td>
                <td>{Factura.iva}</td>
                <td>{Factura.base}</td>
                <td>{Factura.totalCompra}</td>
                <td>{Factura.idCliente}</td>
                <td>{Factura.idFormaPago}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => { setSelectedFactura(Factura); setIsOpen(true) }}
                  >
                    <i className="fa-solid fa-pen"></i>
                  </button>


                </td>
                <td>
                  <button className="btn btn-danger" onClick={() => Delete(Factura.idFactura)}>
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </td>
              </tr>))}

          </tbody>
        </table></div>
      <div>
        <section>
          <button
            type="button"
            className="btn btn-primary"
            style={{ backgroundColor: '#4415A2', border: 'none' }}
            onClick={() => setIsOpen(true)}
          >
            <i className="fa-solid fa-plus"></i> Nueva Forma de Pago
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
              idFormaPago={selectedFactura.idFactura}
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