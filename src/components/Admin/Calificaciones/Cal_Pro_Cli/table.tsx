//hooks
import { useEffect, useState } from "react";
import { ApiPublic, ApiPrivate } from '../../../../hooks/UseFetch.tsx';
//librerias
import Swal from 'sweetalert2';

//Components
import ExampleModal from "./modalUsuario.tsx";

export interface Calificacion {
    idCliente: number;
    idProducto: number;
    numeroCalificacion: number;
    comentarioCalificacion: string;
  }

const Table = () => {

  

  const endpoint: string = 'Consultar_CalificacionCliente';
  const [data, setData] = useState<Calificacion[]>([]);
  const [selectedCalificacion, setSelectedCalificacion] = useState<Calificacion | null>(null);
  const [isOpen, setIsOpen] = useState(false);


  const getCalifications = async () => {
    const result = await ApiPublic(endpoint);

    if (result) {
      setData(result);
    } else {
      console.error('No se recibieron datos o los datos están en un formato inesperado');
    }
  };

  useEffect(() => {
    getCalifications();
  }, []);

  const Delete = (PK: { idCliente: number, idProducto: number }) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esto',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteAxios(PK);
      }
    });
  };

  const deleteAxios = async (PK: { idCliente: number, idProducto: number }) => {
    const response = await ApiPrivate(endpoint, PK)
    if (response) {
      Swal.fire('Eliminado', 'La calificación ha sido eliminada.', 'success');
      getCalifications();
    } else {
      Swal.fire({
        icon: "error",
        title: "Acción fallida",
        text: "No se elimino la calificacion",
      });
    }
  }

  return (
    <div>
      <div className="contenedor_Tabla">
        <table className="table table-striped table-dark">
          <thead>
            <tr>
              <th scope="col">Id Cliente</th>
              <th scope="col">ID Producto</th>
              <th scope="col">Numero Calificacion</th>
              <th scope="col">Comentario</th>
              <th scope="col">Editar</th>
              <th scope="col">Eliminar</th>

            </tr>
          </thead>
          <tbody>
            {data.map((calificacion) => (
              <tr key={`${calificacion.idCliente}-${calificacion.idProducto}`}>
                <td>{calificacion.idCliente}</td>
                <td>{calificacion.idProducto}</td>
                <td>{calificacion.numeroCalificacion}</td>
                <td>{calificacion.comentarioCalificacion}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {setIsOpen(true); setSelectedCalificacion(calificacion)}}
                  >
                    <i className="fa-solid fa-pen"></i>
                  </button>

                  {isOpen && selectedCalificacion &&(
                      <ExampleModal
                        idCliente={calificacion.idCliente}
                        idProducto={calificacion.idProducto}
                        setIsOpen={setIsOpen}
                        modal="Editar"
                        get={getCalifications}
                      />
                    )}
                </td>
                <td>
                  <button className="btn btn-danger" onClick={() => Delete({
                    idCliente: calificacion.idCliente,
                    idProducto: calificacion.idProducto,
                  })}><i className="fa-solid fa-trash"></i></button>
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
            <i className="fa-solid fa-plus"></i> Nueva Calificación
          </button>
          {isOpen && (
            <ExampleModal
              setIsOpen={setIsOpen}
              modal="Agregar"
              get={getCalifications}
            />
          )}
        </section>
      </div>
    </div>
  )

}

export default Table