//hooks
import { useState } from "react";
import { Delete } from "../../../hooks/useCrud.tsx";

//Components
import ExampleModal from "./modalUsuario.tsx";
import ModalDetalles from "../Envios/modalDetalles.tsx";
import { Envio } from "../Types/TypesDatos.tsx";


interface MyModalProps {
  getEnvios: () => void;
  data: Envio[];
}

const Table = ({ getEnvios, data } : MyModalProps) => {

  const [selectedEnvio, setSelectedEnvio] = useState<Envio | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenD, setIsOpenD] = useState(false);

  return (
    <div style={{display: "flex" ,flexDirection: "column", alignItems: "center" ,gap: "10px"}}>
      <div className="contenedor_Tabla" style={{width: "95%"}}>
        <table className="table table-striped table-dark table_Admin">
          <thead>
            <tr>
              <th scope="col">Id Factura</th>
              <th scope="col" style={{ maxWidth: "150px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Tiempo estimado de entrega</th>
              <th scope="col">Observaciones sobre envio</th>
              <th scope="col">Estado Envio</th>
              <th scope="col">Info</th>
              <th scope="col" style={{ maxWidth: "55px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Editar</th>
              <th scope="col" style={{ maxWidth: "60px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {data.map((envio) => (
              <tr key={`${envio.fk_pk_Factura}`}>
                <td>{envio.fk_pk_Factura}</td>
                <td>{envio.tiempoEstimado}</td>
                <td>{envio.observaciones}</td>
                <td>{envio.idEstadoEnvio}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => { setSelectedEnvio(envio); setIsOpenD(true) }}
                  >
                    <i className="fa-solid fa-circle-info"></i>
                  </button>
                </td>
                <td style={{ maxWidth: "40px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => { setSelectedEnvio(envio); setIsOpen(true) }}
                  >
                    <i className="fa-solid fa-pen"></i>
                  </button>
                </td>
                <td style={{ maxWidth: "40px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  <button className="btn btn-danger" onClick={() => Delete(envio.fk_pk_Factura, "fk_pk_Factura", getEnvios, "Eliminar_EnvioAdmin")}>
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
            <i className="fa-solid fa-plus"></i> Nuevo Encargo de Envio
          </button>
          {isOpen && !selectedEnvio && (
            <ExampleModal
              setIsOpen={setIsOpen}
              modal="Agregar"
              get={getEnvios}
            />
          )}
          {isOpenD && selectedEnvio && (
            <ModalDetalles
              idFactura={selectedEnvio.fk_pk_Factura}
              setEnvio={setSelectedEnvio}
              setIsOpenD={setIsOpenD}
            />
          )}
          {isOpen && selectedEnvio && (
            <ExampleModal
              idFactura={selectedEnvio.fk_pk_Factura}
              setEnvio={setSelectedEnvio}
              setIsOpen={setIsOpen}
              modal="Editar"
              get={getEnvios}
            />
          )}
        </section>
      </div>
    </div>
  )

}

export default Table