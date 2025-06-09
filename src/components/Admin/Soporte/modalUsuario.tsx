//hooks
import { ApiPrivate } from '../../../hooks/UseFetch';
import { useEffect, useState } from 'react';

//librerias
import Swal from "sweetalert2";

import { SoporteCon } from "../Types/TypesDatos";


interface MyModalProps {
  get: () => void;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSoporteM: React.Dispatch<React.SetStateAction<SoporteCon | null>>;
  soporte: SoporteCon;
  responder?: string;
}


const ExampleModal: React.FC<MyModalProps> = ({ soporte, setIsOpen, setSoporteM, get, responder }) => {

  const [respuesta, setRespuesta] = useState("");

  const [Soporte, setSoporte] = useState({
    idCliente: "",
    fecha: "",
    pqrs: "",
  });

  const getSoporte = async () => {
    if (soporte) {
      setSoporte((prev) => ({
        ...prev,
        idCliente: String(soporte.idCliente),
        fecha: soporte.fecha,
        pqrs: soporte.pqrs,
      }));
    }
  }

  useEffect(() => {
    getSoporte();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSoporte((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRespuestaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setRespuesta(e.target.value);
  };

  const Validar = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();

    Object.entries(Soporte).forEach(([key, value]) => {
      formData.append(key, value);
    });

    if(responder){
      formData.append("respuesta", respuesta);
    }

    Editar(formData);

  };

  const Editar = async (data: FormData) => {
    let endpoint:string;
    let mensaje:string;

    if(!responder){
      endpoint = "Editar_Soporte";
      mensaje = "PQRS Editada";
    } else {
      endpoint = "Responder_Soporte"
      mensaje = "Respuesta Enviada, para registro revisar gmail"
    }

    const response = await ApiPrivate(endpoint, data);
    if (response) {
      Swal.fire({
        icon: "success",
        title: "Acción exitosa",
        text: mensaje,
      }).then(async () => {
        if (setSoporteM) {
          setSoporteM(null);
        }
        setIsOpen(false);
        get();
      });
    } else if (!response) {
      Swal.fire({
        icon: "error",
        title: "Acción fallida",
        text: "No se completo la operacion",
      }).then(() => {
        if (setSoporteM) {
          setSoporteM(null);
        }
        setIsOpen(false);
      });
    }
  }

  return (

    <div className="modal-backdrop">
      <div className="modal_content">
        <div className="modal-header">
          <h1 className="modal-title fs-5" id="exampleModalLabel" style={{ marginLeft: "5px" }}>Editar PQRS </h1>
          <button type="button" className="btn-close" onClick={() => { setIsOpen(false); if (setSoporteM) { setSoporteM(null) } }} aria-label="Close" style={{ marginLeft: "63%" }}></button>
        </div>
        <hr />
        <div className="modal-body" style={{ marginLeft: "15px" }}>
          <form onSubmit={Validar}>
            <div className="form-group row">
              <div className="row" style={{ marginBottom: "12px" }}>
                <div className="col" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <label htmlFor="formGroupExampleInput">id Cliente</label>
                  <input type="number" className="form-control shadow-none" value={Soporte.idCliente} readOnly />
                </div>
                <div className="col" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <label htmlFor="formGroupExampleInput">fecha</label>
                  {!responder ?<input type="date" className="form-control shadow-none" name="fecha" value={Soporte.fecha} onChange={handleChange} />
                   :<input type="date" className="form-control shadow-none" name="fecha" value={Soporte.fecha} readOnly/>}
                </div>
              </div>
              <div className="row" style={{ marginBottom: "8px" }}>
                <div className="col" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <label htmlFor="formGroupExampleInput">{!responder ? <p>Petición enviada por: {`${soporte.nombreUsuario} ${soporte.apellidoUsuario}`}</p> : <p>Peticion</p> }</label>
                  {!responder ? <textarea className="form-control" name="pqrs" value={Soporte.pqrs} style={{ height: "100px", border: "none" }} onChange={handleChange} />
                  :<textarea className="form-control" name="pqrs" value={Soporte.pqrs} style={{ height: "100px", border: "none" }} readOnly />}
                </div>
              </div>
              {responder == "si" &&

                <div className="row" style={{ marginBottom: "8px" ,display: "flex", justifyContent: "center", gap: "0.5em"}}>
                  <h1 className="modal-title fs-5" style={{display:"flex", justifyContent: "center"}}>Responder a: {soporte.nombreUsuario} {soporte.apellidoUsuario}</h1>
                  <div className="col" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <textarea className="form-control" name="pqrs" value={respuesta} style={{ height: "100px", border: "none" }} onChange={handleRespuestaChange} />
                  </div>
                </div>
              }
              <div className="row">
                <div className="col" style={{ display: "flex", justifyContent: "center", gap: "35px" }}>
                  <button type="button" onClick={() => { setIsOpen(false); if (setSoporteM) { setSoporteM(null) } }}>Cerrar</button>
                  <button type="submit" className="btn btn-primary btn-ms">Guardar</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ExampleModal