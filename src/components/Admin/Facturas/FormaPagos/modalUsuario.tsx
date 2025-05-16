//hooks
import { useState, useEffect } from "react";
import { ApiPrivate, ApiPublic } from '../../../../hooks/UseFetch';
//librerias
import Swal from "sweetalert2";

import { FormaPago } from "./../../Types/TypesDatos";

interface MyModalProps {
  get: () => void;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setFormaPagoB?: React.Dispatch<React.SetStateAction<FormaPago | null>>;
  idFormaPago?: string;
  modal: string;
}


const ExampleModal: React.FC<MyModalProps> = ({ idFormaPago, setIsOpen, setFormaPagoB, modal, get }) => {

  const endpoint: string = 'ConsultarPorID_FormaPago';
  const [FormaPago, setFormaPago] = useState<FormaPago | null>(null);
  const [formaSeleccionada, setFormaSeleccionada] = useState<string | undefined>(idFormaPago);
  const [estadot, setEstadot] = useState(0);

  useEffect(() => {
    const FetchCli_Pro_Cal = async () => {
      try {
        if (modal === "Editar") {
          const result = await ApiPublic(endpoint, idFormaPago, "idFormaPago")
          if (result) { setFormaPago(result); }
          if (FormaPago) {
            setEstadot(FormaPago.estadoMetodoPago);
          }
        }
      } catch (error) {
        console.error('Error cargando FormaPagos:', error);
      }
    };
    FetchCli_Pro_Cal();
  }, []);

  useEffect(() => {
    if (FormaPago) {
      setEstadot(FormaPago.estadoMetodoPago);
    }
  }, [FormaPago]);

  const handleEstadoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEstadot(Number(e.target.value));
  };

  const Validar = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      idFormaPagoA: idFormaPago,
      idFormaPago: formaSeleccionada,
      estadoMetodoPago: estadot,
    };

    if (!formaSeleccionada || formaSeleccionada.trim() === "") {
      Swal.fire({
        icon: "error",
        title: "Acción fallida",
        text: "Forma Pago Vacia, escriba una Forma",
      });
    } else if (estadot < 0 || estadot > 1) {
      Swal.fire({
        icon: "error",
        title: "Acción fallida",
        text: "Escoja un estado",
      });
    } else if (modal === "Agregar") {
      Agregar(data);
    } else if (modal === "Editar") {
      Editar(data);
    }
  };

  const Agregar = async (data: any) => {
    const response = await ApiPrivate("Crear_FormaPago", data);
    if (response) {
      Swal.fire({
        icon: "success",
        title: "Acción exitosa",
        text: "FormaPago registrada",
      }).then(async () => {
        get();
        if (setFormaPagoB) {
          setFormaPagoB(null);
        }
        setIsOpen(false);
      });
    } else if (!response) {
      if (setFormaPagoB) {
        setFormaPagoB(null);
      }
      setIsOpen(false);
      get();
    }
  }

  const Editar = async (data: any) => {
    const response = await ApiPrivate("Editar_FormaPago", data);
    if (response) {
      Swal.fire({
        icon: "success",
        title: "Acción exitosa",
        text: "FormaPago Editada",
      }).then(async () => {
        if (setFormaPagoB) {
          setFormaPagoB(null);
        }
        setIsOpen(false);
        get();
      });
    } else if (!response) {
      Swal.fire({
        icon: "error",
        title: "Acción fallida",
        text: "FormaPago no Editada",
      }).then(() => {
        if (setFormaPagoB) {
          setFormaPagoB(null);
        }
        setIsOpen(false);
      });
    }
  }

  return (

    <div className="modal-backdrop">
      <div className="modal_content">
        <div className="modal-header">
          <h1 className="modal-title fs-5" id="exampleModalLabel" style={{ marginLeft: "5px" }}>{modal} FormaPago</h1>
          <button type="button" className="btn-close" onClick={() => { setIsOpen(false); if (setFormaPagoB) { setFormaPagoB(null) } }} aria-label="Close" style={{ marginLeft: "53%" }}></button>
        </div>
        <hr />
        <div className="modal-body" style={{ marginLeft: "15px" }}>
          <form onSubmit={Validar} encType="multipart/form-data">
            <div className="form-group row">
              <div className="row" style={{ marginBottom: "12px" }}>
                <div className="col" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <label htmlFor="formGroupExampleInput">id Forma de Pago</label>
                  <input type="text" className="form-control shadow-none" value={formaSeleccionada} onChange={(e) => setFormaSeleccionada(e.target.value)} />
                </div>
              </div>
              <select className="form-select" aria-label="Default select example" style={{ backgroundColor: "lightgray", alignItems: "center", marginBottom: "10px"}} value={estadot} onChange={handleEstadoChange}>
                <option value="">Seleccione un Estado</option>
                <option value={1}>
                  Activo
                </option>
                <option value={0}>
                  Inactivo
                </option>
              </select>
              <div className="row">
                <div className="col" style={{ display: "flex", justifyContent: "center", gap: "35px" }}>
                  <button type="button" onClick={() => { setIsOpen(false); if (setFormaPagoB) { setFormaPagoB(null) } }}>Cerrar</button>
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