//hooks
import { useEffect, useState } from "react";
import { ApiPublic, ApiPrivate } from '../../../../hooks/UseFetch.tsx';

//librerias
import Swal from 'sweetalert2';

//Components
import ExampleModal from "./modalUsuario.tsx";
import { Plataforma } from "../../Types/TypesDatos.tsx";

const Table = () => {

  const endpoint: string = 'Consultar_Plataforma';
  const [data, setData] = useState<Plataforma[]>([]);
  const [selectedPlataforma, setSelectedPlataforma] = useState<Plataforma | null>(null);
  const [isOpen, setIsOpen] = useState(false);


  const getPlataforma = async () => {
    const result = await ApiPublic(endpoint);
    if (result) {
      setData(result);
    } else {
      console.error('No se recibieron datos o los datos están en un formato inesperado');
    }
  };

  useEffect(() => {
    getPlataforma();
  }, []);

  const Delete = ( idPlataforma: string) => {
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
          id1: idPlataforma,
          nombre1: "idPlataforma",
        }
        deleteFetch(PK);
      }
    });
  };

  const deleteFetch = async (PK: any) => {
    const response = await ApiPrivate('Eliminar_Plataforma', PK)
    if (response) {
      Swal.fire('Eliminado', response.message , 'success');
      getPlataforma();
    } else {
      Swal.fire({
        icon: "error",
        title: "Acción fallida",
        text: "No se elimino la Plataforma",
      });
    }
  }

  return (
    <div style={{display: "flex" ,flexDirection: "column", alignItems: "center"}}>
      <div className="contenedor_Tabla" style={{width: "90%" }}>
        <table className="table table-striped table-dark table_Admin">
          <thead>
            <tr>
              <th scope="col">Nombre Plataforma</th>
              <th scope="col">Stock Plataforma</th>
              <th scope="col" style={{ maxWidth: "20px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Editar</th>
              <th scope="col" style={{ maxWidth: "25px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Eliminar</th>

            </tr>
          </thead>
          <tbody>
            {data.map((Plataforma) => (
              <tr key={`${Plataforma.idPlataforma}`}>
                <td>{Plataforma.idPlataforma}</td>
                <td>{Plataforma.estadoPlataforma == 1? "Activo" : "Inactivo"}</td>
                <td style={{ maxWidth: "20px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => { setSelectedPlataforma(Plataforma); setIsOpen(true) }}
                  >
                    <i className="fa-solid fa-pen"></i>
                  </button>


                </td>
                <td style={{ maxWidth: "25px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  <button className="btn btn-danger" onClick={() => Delete(Plataforma.idPlataforma)}>
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
            <i className="fa-solid fa-plus"></i> Nueva Plataforma
          </button>
          {isOpen && !selectedPlataforma && (
            <ExampleModal
              setIsOpen={setIsOpen}
              modal="Agregar"
              get={getPlataforma}
            />
          )}
          {isOpen && selectedPlataforma && (
            <ExampleModal
              idPlataforma={selectedPlataforma.idPlataforma}
              setPlataformaB={setSelectedPlataforma}
              setIsOpen={setIsOpen}
              modal="Editar"
              get={getPlataforma}
            />
          )}
        </section>
      </div>
    </div>
  )

}

export default Table