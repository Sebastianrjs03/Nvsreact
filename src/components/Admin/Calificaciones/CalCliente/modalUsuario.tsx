//hooks
import { useState, useEffect } from "react";
import {ApiPrivate, ApiPublic} from '../../../../hooks/UseFetch';
//librerias
import Swal from "sweetalert2";

import { Calificacion } from "./table";

interface MyModalProps {
  get: () => void;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  idCliente?: number;
  idProducto?: number;
  modal: string;
}

interface Cliente {
  idCliente: number;
}

interface Producto {
  idProducto: number;
}

const ExampleModal: React.FC<MyModalProps> = ({ idCliente, idProducto, setIsOpen, modal, get }) => {
  
  const endpoint: string = 'Consultar_Cliente';
  const endpointP: string = '/Productos/Producto.php';
  const endpointC: string = 'ConsultarPorID_CalificacionCliente';
  const [cliente, setCliente] = useState<Cliente[]>([]);
  const [producto, setProducto] = useState<Producto[]>([]);
  const [calificacion, setCalificacion] = useState<Calificacion | null>(null);
  const [clienteSeleccionado, setClienteSeleccionado] = useState<number | undefined>(idCliente);
  const [productoSeleccionado, setProductoSeleccionado] = useState<number | undefined>(idProducto);
  const [calificaciont, setCalificaciont] = useState(0);
  const [comentariot, setComentariot] = useState("");


  useEffect(() => {
    const FetchCli_Pro_Cal = async () => {
      try {
        const resultC = await ApiPublic(endpointC, idCliente, idProducto, "idCliente", "idProducto" )
        const result = await ApiPublic(endpoint);
        const resultP = await ApiPublic(endpointP);

        if (result && resultP && resultC) {
          setCliente(result.data);
          setProducto(resultP.data);
          setCalificacion(resultC.data);
          if(calificacion){
            setCalificaciont(calificacion.numeroCalificacion);
            setComentariot(calificacion.comentarioCalificacion);
          }
          
        } else {
          console.error('No se recibieron datos o los datos están en un formato inesperado');
        }
      } catch (error) {
        console.error('Error cargando clientes:', error);
      }
    };

    FetchCli_Pro_Cal();
  }, []);

  const handleProductoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setProductoSeleccionado(Number(e.target.value));
  };

  const handleClienteChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setClienteSeleccionado(Number(e.target.value));
  };

  const Validar = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const data = {
      idCliente: clienteSeleccionado,
      idProducto: productoSeleccionado,
      numeroCalificacion: calificaciont,
      comentarioCalificacion: comentariot
    };
    console.log(data)
    if (clienteSeleccionado == 0 || productoSeleccionado == 0) {
      Swal.fire({
        icon: "error",
        title: "Acción fallida",
        text: "Cliente o Producto en 0",
      });
    } else if (calificaciont === 0 || calificaciont > 100 || calificaciont < 0) {
      Swal.fire({
        icon: "error",
        title: "Acción fallida",
        text: "calificacion invalida ingrese un numero de 1 a 100 sin decimales",
      });
    } else if (comentariot.trim() === "") {
      Swal.fire({
        icon: "error",
        title: "Acción fallida",
        text: "Comentario vacio, escriba un comentario",
      });
    } else if (modal === "Agregar") {
      Agregar(data);
    } else if (modal === "Editar"){
      Editar(data);
    }
  };

  const Agregar = async (data: any) => {
    const response = await ApiPrivate("Crear_Cliente", data);
    if (response) {
        Swal.fire({
          icon: "success",
          title: "Acción exitosa",
          text: "Calificacion registrada",
        }).then(async () => {
          setIsOpen(false);
          get();
        });
    } else if (!response) {
      Swal.fire({
        icon: "error",
        title: "Acción fallida",
        text: "Calificacion no registrada",
      }).then(() => {
        setIsOpen(false);
      });
    }
  }

  const Editar = async (data: any) => {
    const response = await ApiPrivate("Editar_Cliente", data);
    if (response) {
        Swal.fire({
          icon: "success",
          title: "Acción exitosa",
          text: "Calificacion Editada",
        }).then(async () => {
          setIsOpen(false);
          get();
        });
    } else if (!response) {
      Swal.fire({
        icon: "error",
        title: "Acción fallida",
        text: "Calificacion no Editada",
      }).then(() => {
        setIsOpen(false);
      });
    }
  }

  return (

    <div className="modal-backdrop">
      <div className="modal_content">
        <div className="modal-header">
          <h1 className="modal-title fs-5" id="exampleModalLabel" style={{ marginLeft: "5px" }}>{modal} Calificacion</h1>
          <button type="button" className="btn-close" onClick={() => setIsOpen(false)} aria-label="Close" style={{ marginLeft: "53%" }}></button>
        </div>
        <hr />
        <div className="modal-body" style={{ marginLeft: "15px" }}>
          <form onSubmit={Validar} encType="multipart/form-data">
            <div className="form-group row">
              {!clienteSeleccionado && <div className="row" style={{ marginBottom: "12px" }}>
                <div className="col" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <label htmlFor="formGroupExampleInput">id Cliente</label>
                  <select className="form-select" aria-label="Default select example" style={{ backgroundColor: "lightgray" }} value={clienteSeleccionado} onChange={handleClienteChange}>
                    {cliente.map(cliente => (
                      <option key={cliente.idCliente} value={cliente.idCliente}>
                        {cliente.idCliente}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <label htmlFor="formGroupExampleInput">id Producto</label>
                  <select className="form-select" aria-label="Default select example" style={{ backgroundColor: "lightgray" }} value={productoSeleccionado} onChange={handleProductoChange}>
                    {producto.map(producto => (
                      <option key={producto.idProducto} value={producto.idProducto}>
                        {producto.idProducto}
                      </option>
                    ))}
                  </select>
                </div>
              </div>}
              <div className="row" style={{ marginBottom: "8px" }}>
                <div className="col" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <label htmlFor="formGroupExampleInput">Calificacion</label>
                  <input type="number" className="form-control shadow-none" value={calificaciont} onChange={(e) => setCalificaciont(Number(e.target.value))}/>
                </div>
              </div>
              <div className="row" style={{ marginBottom: "15px" }}>
                <div className="col" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <label htmlFor="formGroupExampleInput">Comentario</label>
                  <textarea className="form-control" value={comentariot} style={{ height: "100px", border: "none" }} onChange={(e) => setComentariot(e.target.value)} ></textarea>
                </div>
              </div>
              <div className="row">
                <div className="col" style={{ display: "flex", justifyContent: "center", gap: "35px" }}>
                  <button type="button" onClick={() => setIsOpen(false)}>Cerrar</button>
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