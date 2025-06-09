//hooks
import { useState, useEffect } from "react";
import { ApiPrivate, ApiPublic } from '../../../hooks/UseFetch';
//librerias
import Swal from "sweetalert2";
//types
import { Envio, EstadoEnvio, Factura } from "../Types/TypesDatos";

interface MyModalProps {
  get: () => void;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  modal: string;
  setEnvio?: React.Dispatch<React.SetStateAction<Envio | null>>;
  idFactura?: number;
}


const ExampleModal: React.FC<MyModalProps> = ({ idFactura, setIsOpen, setEnvio, modal, get }) => {

  const [Facturas, setFacturas] = useState<Factura[]>([]);
  const [estadosEnvios, setEstadosEnvios] = useState<EstadoEnvio[]>([]);

  const [Envio, setEnvioF] = useState({
    idFactura: "2",
    tiempo: "",
    observaciones: "",
    idEstadoEnvio: "EnProceso",
  });

    const FetchEnvio = async () => {
      try {
        const result = await ApiPublic("Consultar_Factura");
        const resultP = await ApiPublic("Consultar_EstadoEnvio");

        if (result && resultP) {
          setFacturas(result);
          setEstadosEnvios(resultP);
        } else {
          console.error('No se recibieron datos o los datos están en un formato inesperado');
        }
        if (modal === "Editar") {
          const resultC = await ApiPublic("ConsultarPorID_EnvioAdmin",
            {
              id1: idFactura,
              nombre1: "fk_pk_Factura"
            }
          )
          if (resultC) {
            setEnvioF((prev) => ({
              ...prev,
              idFactura: resultC[0].fk_pk_Factura?.toString(),
              tiempo: resultC[0].tiempoEstimado,
              observaciones: resultC[0].observaciones,
              idEstadoEnvio: resultC[0].idEstadoEnvio,
            }));
          }
        }
      } catch (error) {
        console.error('Error cargando Facturas y estados:', error);
      }
    };

  useEffect(() => {
    FetchEnvio();
  }, [idFactura]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEnvioF((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const Validar = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();

    Object.entries(Envio).forEach(([key, value]) => {
      formData.append(key, String(value));
    });

    if (Envio.tiempo === "" || Envio.observaciones === "" ) {
      Swal.fire({
        icon: "error",
        title: "Acción fallida",
        text: "Complete todos los campos de texto",
      });
      return;
    } else if (Envio.idEstadoEnvio === "" ) {
      Swal.fire({
        icon: "error",
        title: "Acción fallida",
        text: "Seleccione un estado de envio",
      });
      return;
    } else if (modal === "Agregar") {
      if (Envio.idFactura === "") {
        Swal.fire({
          icon: "error",
          title: "Acción fallida",
          text: "Facturta o Producto en 0, seleccione una opcion",
        });
        return;
      }
      Subir(formData);
    } else if (modal === "Editar") {
      Subir(formData);
    }
  };

  const Subir = async (data: any) => {
    let mensaje;
    let endpoint;
    if(modal === "Editar"){
      mensaje = "Envio Editado";
      endpoint = "Editar_EnvioAdmin";
    } else {
      mensaje = "Envio Creado";
      endpoint = "Crear_EnvioAdmin";
    }
    const response = await ApiPrivate(endpoint, data);
    if (response?.error) {
      Swal.fire({
        icon: "error",
        title: "Acción fallida",
        text: response.mensaje,
      }).then(async () => {
        get();
        if (setEnvio) {
          setEnvio(null);
        }
        setIsOpen(false);
      });
    } else {
      Swal.fire({
        icon: "success",
        title: "Acción exitosa",
        text: mensaje,
      }).then(async () => {
        get();
        if (setEnvio) {
          setEnvio(null);
        }
        setIsOpen(false);
      });
    }
  }
  return (

    <div className="modal-backdrop">
      <div className="modal_content">
        <div className="modal-header">
          <h1 className="modal-title fs-5" id="exampleModalLabel" style={{ marginLeft: "5px" }}>{modal} Envios</h1>
          <button type="button" className="btn-close" onClick={() => { setIsOpen(false); if (setEnvio) { setEnvio(null) } }} aria-label="Close" style={{ marginLeft: "53%" }}></button>
        </div>
        <hr />
        <div className="modal-body" style={{ marginLeft: "15px" }}>
          <form onSubmit={Validar} encType="multipart/form-data">
            <div className="form-group row">
              <div className="row" style={{ marginBottom: "12px" }}>
                <div className="col" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <label htmlFor="formGroupExampleInput">Seleccione</label>
                  {modal === "Agregar" ?
                    <select className="form-select" aria-label="Default select example" style={{ backgroundColor: "lightgray", alignItems: "center", marginBottom: "10px" }} name="idFactura" value={Envio.idFactura} onChange={handleChange}>
                      {Facturas
                        .map((fac) => (
                          <option key={fac.idFactura} value={fac.idFactura}>
                            {fac.idFactura}
                          </option>
                        ))
                      }
                    </select> :
                    <input type="text" className="form-control shadow-none" value={Envio.idFactura} readOnly />
                  }
                </div>
                <div className="col" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <label htmlFor="formGroupExampleInput">Tiempo Estimado</label>
                  <input type="text" className="form-control shadow-none" name="tiempo" value={Envio.tiempo} onChange={handleChange} />
                </div>
              </div>
              <div className="row" style={{ marginBottom: "12px" }}>
                <div className="col" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <label htmlFor="formGroupExampleInput">Observaciones Envio</label>
                  <textarea className="form-control shadow-none" name="observaciones" value={Envio.observaciones} onChange={handleChange} />
                </div>
              </div>
              <div className="row" style={{ marginBottom: "12px" }}>
                <div className="col" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <label htmlFor="formGroupExampleInput">Estado Actual Envio</label>
                  <select className="form-select" aria-label="Default select example" style={{ backgroundColor: "lightgray", alignItems: "center", marginBottom: "10px" }} name="idEstadoEnvio" value={Envio.idEstadoEnvio} onChange={handleChange}>
                    {estadosEnvios
                      .map((est) => (
                        <option key={est.idEstadoEnvio} value={est.idEstadoEnvio}>
                          {est.idEstadoEnvio}
                        </option>
                      ))
                    }
                  </select>
                </div>
              </div>
              <div className="row">
                <div className="col" style={{ display: "flex", justifyContent: "center", gap: "35px" }}>
                  <button type="button" className="ButtonCloseModal" onClick={() => { setIsOpen(false); if (setEnvio) { setEnvio(null) } }}>Cerrar</button>
                  <button type="submit" className="btn btn-primary btn-ms submit">Guardar</button>
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