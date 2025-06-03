//hooks
import { useState, useEffect } from "react";
import { ApiPrivate, ApiPublic } from '../../../../hooks/UseFetch';
//librerias
import Swal from "sweetalert2";

import { Genero } from "./../../Types/TypesDatos";

interface MyModalProps {
  get: () => void;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setGeneroB?: React.Dispatch<React.SetStateAction<Genero | null>>;
  idGenero?: string;
  modal: string;
}


const ExampleModal: React.FC<MyModalProps> = ({ idGenero, setIsOpen, setGeneroB, modal, get }) => {

  const endpoint: string = 'ConsultarPorID_Genero';
  const [Genero, setGenero] = useState<Genero | null>(null);
  const [generoSeleccionado, setGeneroSeleccionado] = useState<string | undefined>(idGenero);
  const [estadot, setEstadot] = useState<number>(0);

  useEffect(() => {
    const FetchCli_Pro_Cal = async () => {
      try {
        if (modal === "Editar") {
          const result = await ApiPublic(endpoint,{
              id1: idGenero,
              nombre1: "idGeneroJuego",
            })
          if (result) { setGenero(result[0]) }
        }
      } catch (error) {
        console.error('Error cargando Generos:', error);
      }
    };
    FetchCli_Pro_Cal();
  }, []);

  useEffect(() => {
    if (Genero) {
      setEstadot(Genero.estadoGeneroJuego);
      console.log(Genero)
    }
  }, [Genero]);
  
  const handleEstadotChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEstadot(Number(e.target.value));
  };

  const Validar = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      idGeneroA: idGenero,
      idGenero: generoSeleccionado,
      estado: estadot,
    };

    if (!generoSeleccionado || generoSeleccionado.trim() === "") {
      Swal.fire({
        icon: "error",
        title: "Acción fallida",
        text: "genero Pago Vacia, escriba una genero",
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
    const response = await ApiPrivate("Crear_Genero", data);
    if (response) {
      Swal.fire({
        icon: "success",
        title: "Acción exitosa",
        text: "Crear Genero Exitoso" ,
      }).then(async () => {
        get();
        if (setGeneroB) {
          setGeneroB(null);
        }
        setIsOpen(false);
      });
    } else if (!response) {
      if (setGeneroB) {
        setGeneroB(null);
      }
      setIsOpen(false);
      get();
    }
  }

  const Editar = async (data: any) => {
    const response = await ApiPrivate("Editar_Genero", data);
    if (response) {
      Swal.fire({
        icon: "success",
        title: "Acción exitosa",
        text: "Editar Genero Exitoso",
      }).then(async () => {
        if (setGeneroB) {
          setGeneroB(null);
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
        if (setGeneroB) {
          setGeneroB(null);
        }
        setIsOpen(false);
      });
    }
  }

  return (

    <div className="modal-backdrop">
      <div className="modal_content">
        <div className="modal-header">
          <h1 className="modal-title fs-5" id="exampleModalLabel" style={{ marginLeft: "5px" }}>{modal} Genero</h1>
          <button type="button" className="btn-close" onClick={() => { setIsOpen(false); if (setGeneroB) { setGeneroB(null) } }} aria-label="Close" style={{ marginLeft: "53%" }}></button>
        </div>
        <hr />
        <div className="modal-body" style={{ marginLeft: "15px" }}>
          <form onSubmit={Validar} encType="multipart/form-data">
            <div className="form-group row">
              <div className="row" style={{ marginBottom: "12px" }}>
                <div className="col" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <label htmlFor="formGroupExampleInput">id Genero de Juego</label>
                  <input type="text" className="form-control shadow-none" value={generoSeleccionado} onChange={(e) => setGeneroSeleccionado(e.target.value)} />
                </div>
              </div>
              <select className="form-select" aria-label="Default select example" style={{ backgroundColor: "lightgray", alignItems: "center", marginBottom: "10px"}} value={estadot} onChange={handleEstadotChange}>
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
                  <button type="button" onClick={() => { setIsOpen(false); if (setGeneroB) { setGeneroB(null) } }}>Cerrar</button>
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