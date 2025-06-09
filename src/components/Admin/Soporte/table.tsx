//hooks
import { useState } from "react";
import { Delete } from "../../../hooks/useCrud.tsx";

//types
import { ClienteCon, SoporteCon, Soporte } from "../Types/TypesDatos.tsx";

//Components
import ExampleModal from "./modalUsuario.tsx";

interface MyModalProps {
  data: Soporte[];
  cliente: ClienteCon[];
  getSoporte: () => void;

}

const Table = ({ getSoporte, data, cliente }: MyModalProps) => {

  const [selectedSoporte, setSelectedSoporte] = useState<SoporteCon | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenR, setIsOpenR] = useState(false);

  const Tabla = Array.isArray(data)
    ? data.map(Cli => {
      const seleccionado = cliente.find(PQRS => PQRS.idCliente === Cli.idCliente);
      return {
        ...Cli,
        nombreUsuario: seleccionado ? seleccionado.nombreUsuario : null,
        apellidoUsuario: seleccionado ? seleccionado.apellidoUsuario : null
      };
    })
    : [];

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
      <div className="contenedor_Tabla" style={{ width: "100%" }}>
        <table className="table table-striped table-dark table_Admin">
          <thead>
            <tr>
              <th scope="col">Id Cliente</th>
              <th scope="col">Fecha Peticion</th>
              <th scope="col">Pregunta, Queja o Reclamo</th>
              <th scope="col" style={{ maxWidth: "60px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Responder</th>
              <th scope="col">Editar</th>
              <th scope="col" style={{ maxWidth: "50px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {Tabla.map((pqrs) => (
              <tr key={`${pqrs.idCliente}`}>
                <td>{pqrs.idCliente}-{pqrs.nombreUsuario} {pqrs.apellidoUsuario}</td>
                <td>{pqrs.fecha}</td>
                <td>{pqrs.pqrs}</td>
                <td style={{ maxWidth: "60px" }}>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => { setSelectedSoporte(pqrs); setIsOpenR(true) }}
                  >
                    <i className="fa-solid fa-square-envelope"></i>
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => { setSelectedSoporte(pqrs); setIsOpen(true) }}
                  >
                    <i className="fa-solid fa-pen"></i>
                  </button>
                </td>
                <td style={{ maxWidth: "50px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  <button className="btn btn-danger" onClick={() => Delete(pqrs.idCliente, "idCliente", getSoporte, "Eliminar_Soporte", pqrs.fecha, "fecha")}>
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </td>
              </tr>))}
          </tbody>
        </table>
        {Tabla.length === 0 && (
          <h1>!!Queremos Dormir!!</h1>
        )}
      </div>

      {isOpenR && selectedSoporte && (
        <ExampleModal
          soporte={selectedSoporte}
          setSoporteM={setSelectedSoporte}
          setIsOpen={setIsOpenR}
          get={getSoporte}
          responder="si"
        />
      )}
      {isOpen && selectedSoporte && (
        <ExampleModal
          soporte={selectedSoporte}
          setSoporteM={setSelectedSoporte}
          setIsOpen={setIsOpen}
          get={getSoporte}
        />
      )}
    </div>
  )

}

export default Table