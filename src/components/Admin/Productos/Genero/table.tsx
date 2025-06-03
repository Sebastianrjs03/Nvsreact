//hooks
import { useEffect, useState } from "react";
import { ApiPublic, ApiPrivate } from '../../../../hooks/UseFetch.tsx';

//librerias
import Swal from 'sweetalert2';

//Components
import ExampleModal from "./modalUsuario.tsx";
import { Genero } from "../../Types/TypesDatos.tsx";

const Table = () => {

  const endpoint: string = 'Consultar_Genero';
  const [data, setData] = useState<Genero[]>([]);
  const [selectedGenero, setSelectedGenero] = useState<Genero | null>(null);
  const [isOpen, setIsOpen] = useState(false);


  const getGenero = async () => {
    const result = await ApiPublic(endpoint);
    if (result) {
      setData(result);
    } else {
      console.error('No se recibieron datos o los datos están en un formato inesperado');
    }
  };

  useEffect(() => {
    getGenero();
  }, []);

  const Delete = ( idGenero: string) => {
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
          id1: idGenero,
          nombre1: "idGeneroJuego",
        }
        deleteFetch(PK);
      }
    });
  };

  const deleteFetch = async (PK: any) => {
    const response = await ApiPrivate('Eliminar_Genero', PK)
    if (response) {
      Swal.fire('Eliminado', response.message , 'success');
      getGenero();
    } else {
      Swal.fire({
        icon: "error",
        title: "Acción fallida",
        text: "No se elimino el Genero",
      });
    }
  }

  return (
    <div style={{display: "flex" ,flexDirection: "column", alignItems: "center", gap: "10px"}}>
      <div className="contenedor_Tabla" style={{width: "90%" }}>
        <table className="table table-striped table-dark table_Admin">
          <thead>
            <tr>
              <th scope="col">Nombre Genero</th>
              <th scope="col">Stock Genero</th>
              <th scope="col" style={{ maxWidth: "30px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Editar</th>
              <th scope="col" style={{ maxWidth: "30px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Eliminar</th>

            </tr>
          </thead>
          <tbody>
            {data.map((Genero) => (
              <tr key={`${Genero.idGeneroJuego}`}>
                <td>{Genero.idGeneroJuego}</td>
                <td>{Genero.estadoGeneroJuego == 1? "Activo" : "Inactivo"}</td>
                <td style={{ maxWidth: "30px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => { setSelectedGenero(Genero); setIsOpen(true) }}
                  >
                    <i className="fa-solid fa-pen"></i>
                  </button>


                </td>
                <td style={{ maxWidth: "30px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  <button className="btn btn-danger" onClick={() => Delete(Genero.idGeneroJuego)}>
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
            <i className="fa-solid fa-plus"></i> Nuevo Genero de Juego
          </button>
          {isOpen && !selectedGenero && (
            <ExampleModal
              setIsOpen={setIsOpen}
              modal="Agregar"
              get={getGenero}
            />
          )}
          {isOpen && selectedGenero && (
            <ExampleModal
              idGenero={selectedGenero.idGeneroJuego}
              setGeneroB={setSelectedGenero}
              setIsOpen={setIsOpen}
              modal="Editar"
              get={getGenero}
            />
          )}
        </section>
      </div>
    </div>
  )

}

export default Table