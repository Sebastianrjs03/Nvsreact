//hooks
import { useState, useEffect } from "react";
import { ApiPrivate, ApiPublic } from '../../../../hooks/UseFetch';
//librerias
import Swal from "sweetalert2";

import { Plataforma } from "./../../Types/TypesDatos";

interface MyModalProps {
  get: () => void;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setPlataformaB?: React.Dispatch<React.SetStateAction<Plataforma | null>>;
  idPlataforma?: string;
  modal: string;
}


const ExampleModal: React.FC<MyModalProps> = ({ idPlataforma, setIsOpen, setPlataformaB, modal, get }) => {

  const endpoint: string = 'ConsultarPorID_Plataforma';
  const [Plataforma, setPlataforma] = useState<Plataforma | null>(null);
  const [PlataformaSeleccionado, setPlataformaSeleccionado] = useState<string | undefined>(idPlataforma);
  const [estadot, setEstadot] = useState(0);

  useEffect(() => {
    const FetchCli_Pro_Cal = async () => {
      try {
        if (modal === "Editar") {
          const result = await ApiPublic(endpoint, {
            id1: idPlataforma,
            nombre1: "idPlataforma",
          })
          if (result) { setPlataforma(result[0]) }
        }
      } catch (error) {
        console.error('Error cargando Plataformas:', error);
      }
    };
    FetchCli_Pro_Cal();
  }, []);

  useEffect(() => {
    if (Plataforma) {
      setEstadot(Plataforma.estadoPlataforma);
    }
  }, [Plataforma]);

  const handleEstadotChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEstadot(Number(e.target.value));
  };

  const Validar = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      idPlataformaA: idPlataforma,
      idPlataforma: PlataformaSeleccionado,
      estado: estadot,
    };

    if (!PlataformaSeleccionado || PlataformaSeleccionado.trim() === "") {
      Swal.fire({
        icon: "error",
        title: "Acción fallida",
        text: "Plataforma Vacia, escriba una Plataforma",
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
    const response = await ApiPrivate("Crear_Plataforma", data);
    if (response) {
      Swal.fire({
        icon: "success",
        title: "Acción exitosa",
        text: "Crear Plataforma Exitoso",
      }).then(async () => {
        get();
        if (setPlataformaB) {
          setPlataformaB(null);
        }
        setIsOpen(false);
      });
    } else if (!response) {
      if (setPlataformaB) {
        setPlataformaB(null);
      }
      setIsOpen(false);
      get();
    }
  }

  const Editar = async (data: any) => {
    const response = await ApiPrivate("Editar_Plataforma", data);
    if (response) {
      Swal.fire({
        icon: "success",
        title: "Acción exitosa",
        text: "Editar Plataforma Exitoso",
      }).then(async () => {
        if (setPlataformaB) {
          setPlataformaB(null);
        }
        setIsOpen(false);
        get();
      });
    } else if (!response) {
      Swal.fire({
        icon: "error",
        title: "Acción fallida",
        text: "No hay datos",
      }).then(() => {
        if (setPlataformaB) {
          setPlataformaB(null);
        }
        setIsOpen(false);
      });
    }
  }

  return (

    <div className="modal-backdrop">
      <div className="modal_content">
        <div className="modal-header">
          <h1 className="modal-title fs-5" id="exampleModalLabel" style={{ marginLeft: "5px" }}>{modal} Plataforma</h1>
          <button type="button" className="btn-close" onClick={() => { setIsOpen(false); if (setPlataformaB) { setPlataformaB(null) } }} aria-label="Close" style={{ marginLeft: "53%" }}></button>
        </div>
        <hr />
        <div className="modal-body" style={{ marginLeft: "15px" }}>
          <form onSubmit={Validar} encType="multipart/form-data">
            <div className="form-group row">
              <div className="row" style={{ marginBottom: "12px" }}>
                <div className="col" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <label htmlFor="formGroupExampleInput">id Plataforma de Juego</label>
                  <input type="text" className="form-control shadow-none" value={PlataformaSeleccionado} onChange={(e) => setPlataformaSeleccionado(e.target.value)} onFocus={(e) => { if (e.target.value === "0") { e.target.value = ""; } }} />
                </div>
              </div>
              <div className="row" style={{ marginBottom: "12px" }}>
                <div className="col" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <label htmlFor="formGroupExampleInput">Seleccione</label>
                  <select className="form-select" aria-label="Default select example" style={{ backgroundColor: "lightgray", marginLeft: "2%", marginBottom: "10px", width: "90%" }} value={estadot} onChange={handleEstadotChange}>
                    <option value="">Un Estado</option>
                    <option value={1}>
                      Activo
                    </option>
                    <option value={0}>
                      Inactivo
                    </option>
                  </select>
                </div>
              </div>
              <div className="row">
                <div className="col" style={{ display: "flex", justifyContent: "center", gap: "35px" }}>
                  <button type="button" onClick={() => { setIsOpen(false); if (setPlataformaB) { setPlataformaB(null) } }}>Cerrar</button>
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