//hooks
import { useState } from "react";
import { ApiPrivate } from '../../../../hooks/UseFetch.tsx';

//librerias
import Swal from 'sweetalert2';

//Components
import ExampleModal from "./modalUsuario.tsx";
import ModalDetalles from "./modalDetalles.tsx";
import { Usuario } from "../../Types/TypesDatos.tsx";

interface MyModalProps {
  getUsuario: () => void;
  data: Usuario[];
}

const Table = ({ getUsuario, data } : MyModalProps) => {

  const [selectedUsuario, setSelectedUsuario] = useState<Usuario | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenD, setIsOpenD] = useState(false);

  const Delete = ( idUsuario: number) => {
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
          id1: idUsuario,
          nombre1: "idUsuario",
        }
        deleteFetch(PK);
      }
    });
  };

  const deleteFetch = async (PK: any) => {
    const response = await ApiPrivate('Eliminar_UsuarioAdmin', PK)
    if (response) {
      Swal.fire('Eliminado', 'El Usuario ha sido eliminada.', 'success');
      getUsuario();
    } else {
      Swal.fire({
        icon: "error",
        title: "Acción fallida",
        text: "No se elimino la Usuario",
      });
    }
  }
  return (
    <div style={{display: "flex" ,flexDirection: "column", alignItems: "center", gap: "10px"}}>
      <div className="contenedor_Tabla" style={{width: "100%" }}>
        <table className="table table-striped table-dark table_Admin">
          <thead>
            <tr>
              <th scope="col">Id Usuario</th>
              <th scope="col">Nombre Usuario</th>
              <th scope="col">Segundo Nombre</th>
              <th scope="col">Apellido Usuario</th>
              <th scope="col">Segundo Apellido</th>
              <th scope="col">Correo</th>
              <th scope="col">Celular</th>
              <th scope="col" style={{ maxWidth: "200px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Contraseña</th>
              <th scope="col">Rol</th>
              <th scope="col">Info</th>
              <th scope="col">Editar</th>
              <th scope="col">Delete</th>

            </tr>
          </thead>
          <tbody>
            {data.map((Usuario) => (
              <tr key={`${Usuario.idUsuario}`}>
                <td>{Usuario.idUsuario}</td>
                <td>{Usuario.nombreUsuario}</td>
                <td>{Usuario.senombreUsuario}</td>
                <td>{Usuario.apellidoUsuario}</td>
                <td>{Usuario.seapellidoUsuario}</td>
                <td>{Usuario.correoUsuario}</td>
                <td>{Usuario.celularUsuario}</td>
                <td style={{ maxWidth: "200px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{Usuario.contrasenaUsuario}</td>
                <td>{Usuario.idRol}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => { setSelectedUsuario(Usuario); setIsOpenD(true) }}
                  >
                    <i className="fa-solid fa-circle-info"></i>
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => { setSelectedUsuario(Usuario); setIsOpen(true) }}
                  >
                    <i className="fa-solid fa-pen"></i>
                  </button>
                </td>
                <td>
                  <button className="btn btn-danger" onClick={() => Delete(Usuario.idUsuario)}>
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </td>
              </tr>))}

          </tbody>
        </table>
        {data.length === 0 && (
          <h1>!!Queremos Dormir!!</h1>
        )}
        </div>
      <div>
        <section>
          <button
            type="button"
            className="btn btn-primary"
            style={{ backgroundColor: '#4415A2', border: 'none' }}
            onClick={() => setIsOpen(true)}
          >
            <i className="fa-solid fa-plus"></i> Nuevo Usuario
          </button>
          {isOpen && !selectedUsuario && (
            <ExampleModal
              setIsOpen={setIsOpen}
              modal="Agregar"
              get={getUsuario}
            />
          )}
          {isOpenD && selectedUsuario && (
            <ModalDetalles
              idUsuario={selectedUsuario.idUsuario}
              idRol={selectedUsuario.idRol}
              setUsuarioB={setSelectedUsuario}
              setIsOpenD={setIsOpenD}
            />
          )}
          {isOpen && selectedUsuario && (
            <ExampleModal
              idUsuario={selectedUsuario.idUsuario}
              setUsuarioB={setSelectedUsuario}
              setIsOpen={setIsOpen}
              modal="Editar"
              get={getUsuario}
            />
          )}
        </section>
      </div>
    </div>
  )

}

export default Table