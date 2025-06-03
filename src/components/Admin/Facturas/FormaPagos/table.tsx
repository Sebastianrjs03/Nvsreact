//hooks
import { useEffect, useState } from "react";
import { ApiPublic, ApiPrivate } from '../../../../hooks/UseFetch.tsx';

//librerias
import Swal from 'sweetalert2';

//Components
import ExampleModal from "./modalUsuario.tsx";
import { FormaPago } from "../../Types/TypesDatos.tsx";

const Table = () => {

  const endpoint: string = 'Consultar_FormaPago';
  const [data, setData] = useState<FormaPago[]>([]);
  const [selectedFormaPago, setSelectedFormaPago] = useState<FormaPago | null>(null);
  const [isOpen, setIsOpen] = useState(false);


  const getFormaPago = async () => {
    const result = await ApiPublic(endpoint);

    if (result) {
      setData(result);
    } else {
      console.error('No se recibieron datos o los datos están en un formato inesperado');
    }
  };

  useEffect(() => {
    getFormaPago();
  }, []);

  const Delete = ( idFormaPago: string) => {
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
          id1: idFormaPago,
          nombre1: "idFormaPago",
        }
        deleteFetch(PK);
      }
    });
  };

  const deleteFetch = async (PK: any) => {
    const response = await ApiPrivate('Eliminar_FormaPago', PK)
    if (response) {
      Swal.fire('Eliminado', 'La Forma de pago ha sido eliminada.', 'success');
      getFormaPago();
    } else {
      Swal.fire({
        icon: "error",
        title: "Acción fallida",
        text: "No se elimino la FormaPago",
      });
    }
  }

  return (
    <div style={{display: "flex" ,flexDirection: "column", alignItems: "center" ,gap: "10px"}}>
      <div className="contenedor_Tabla" style={{width: "80%"}}>
        <table className="table table-striped table-dark table_Admin">
          <thead>
            <tr>
              <th scope="col">Id FormaPago</th>
              <th scope="col">Stock Forma</th>
              <th scope="col">Editar</th>
              <th scope="col">Eliminar</th>

            </tr>
          </thead>
          <tbody>
            {data.map((FormaPago) => (
              <tr key={`${FormaPago.idFormaPago}`}>
                <td>{FormaPago.idFormaPago}</td>
                <td>{FormaPago.estadoMetodoPago == 1? "Activo" : "Inactivo"}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => { setSelectedFormaPago(FormaPago); setIsOpen(true) }}
                  >
                    <i className="fa-solid fa-pen"></i>
                  </button>


                </td>
                <td>
                  <button className="btn btn-danger" onClick={() => Delete(FormaPago.idFormaPago)}>
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
          {isOpen && !selectedFormaPago && (
            <ExampleModal
              setIsOpen={setIsOpen}
              modal="Agregar"
              get={getFormaPago}
            />
          )}
          {isOpen && selectedFormaPago && (
            <ExampleModal
              idFormaPago={selectedFormaPago.idFormaPago}
              setFormaPagoB={setSelectedFormaPago}
              setIsOpen={setIsOpen}
              modal="Editar"
              get={getFormaPago}
            />
          )}
        </section>
      </div>
    </div>
  )

}

export default Table