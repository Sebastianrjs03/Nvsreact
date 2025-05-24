//hooks
import { useState, useEffect } from "react";
import { ApiPrivate, ApiPublic } from '../../../../hooks/UseFetch';
//librerias
import Swal from "sweetalert2";

import { Calificacion, Cliente, ProductoA } from "./../../Types/TypesDatos";

interface MyModalProps {
  get: () => void;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setCalificacionB?: React.Dispatch<React.SetStateAction<Calificacion | null>>;
  idCliente?: number;
  idProducto?: number;
  modal: string;
}


const ExampleModal: React.FC<MyModalProps> = ({ idCliente, idProducto, setIsOpen, setCalificacionB, modal, get }) => {
  const endpoint: string = 'Consultar_Cliente';
  const endpointP: string = 'Consultar_Producto';
  const endpointC: string = 'ConsultarPorID_CalificacionCliente';
  const [cliente, setCliente] = useState<Cliente[]>([]);
  const [producto, setProducto] = useState<ProductoA[]>([]);
  const [calificacion, setCalificacion] = useState<Calificacion | null>(null);
  const [clienteSeleccionado, setClienteSeleccionado] = useState<number | undefined>(idCliente);
  const [productoSeleccionado, setProductoSeleccionado] = useState<number | undefined>(idProducto);
  const [calificaciont, setCalificaciont] = useState(0);
  const [comentariot, setComentariot] = useState("");

  useEffect(() => {
    const FetchCli_Pro_Cal = async () => {
      try {
        if (modal === "Editar") {
          const resultC = await ApiPublic(endpointC,
            {
              id1 : idCliente,
              nombre1 : "idCliente",
              id2 : idProducto,
              nombre2 : "idProducto"
            }
          )
          if (resultC) { setCalificacion(resultC); }
          if (calificacion) {
            setCalificaciont(calificacion.numeroCalificacion);
            setComentariot(calificacion.comentarioCalificacion);
          }
        } else {
          const result = await ApiPublic(endpoint);
          const resultP = await ApiPublic(endpointP);

          if (result && resultP) {
            setCliente(result);
            setProducto(resultP);
          } else {
            console.error('No se recibieron datos o los datos están en un formato inesperado');
          }
        }
      } catch (error) {
        console.error('Error cargando clientes:', error);
      }
    };

    FetchCli_Pro_Cal();
  }, []);

  useEffect(() => {
    if (calificacion) {
      setCalificaciont(calificacion.numeroCalificacion);
      setComentariot(calificacion.comentarioCalificacion);
    }
  }, [calificacion]);

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
    } else if (modal === "Editar") {
      Editar(data);
    }
  };

  const Agregar = async (data: any) => {
    const response = await ApiPrivate("Crear_CalificacionCliente", data);
    if (response) {
        Swal.fire({
        icon: "success",
        title: "Acción exitosa",
        text: "Calificacion registrada",
      }).then(async () => {
        get();
        if (setCalificacionB) {
          setCalificacionB(null);
        }
        setIsOpen(false);
      });
    } else if (!response) {
        if (setCalificacionB) {
          setCalificacionB(null);
        }
        setIsOpen(false);
        get();
    }
  }

  const Editar = async (data: any) => {
    const response = await ApiPrivate("Editar_CalificacionCliente", data);
    if (response) {
      Swal.fire({
        icon: "success",
        title: "Acción exitosa",
        text: "Calificacion Editada",
      }).then(async () => {
        if (setCalificacionB) {
          setCalificacionB(null);
        }
        setIsOpen(false);
        get();
      });
    } else if (!response) {
      Swal.fire({
        icon: "error",
        title: "Acción fallida",
        text: "Calificacion no Editada",
      }).then(() => {
        if (setCalificacionB) {
          setCalificacionB(null);
        }
        setIsOpen(false);
      });
    }
  }

  return (

    <div className="modal-backdrop">
      <div className="modal_content">
        <div className="modal-header">
          <h1 className="modal-title fs-5" id="exampleModalLabel" style={{ marginLeft: "5px" }}>{modal} Calificacion</h1>
          <button type="button" className="btn-close" onClick={() => { setIsOpen(false); if (setCalificacionB) { setCalificacionB(null) } }} aria-label="Close" style={{ marginLeft: "53%" }}></button>
        </div>
        <hr />
        <div className="modal-body" style={{ marginLeft: "15px" }}>
          <form onSubmit={Validar} encType="multipart/form-data">
            <div className="form-group row">
              { modal === "Agregar" && <div className="row" style={{ marginBottom: "12px" }}>
                <div className="col" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <label htmlFor="formGroupExampleInput">id Cliente</label>
                  <select className="form-select" aria-label="Default select example" style={{ backgroundColor: "lightgray" }} value={clienteSeleccionado ?? ''} onChange={handleClienteChange}>
                    <option value="">Seleccione un cliente</option>
                    {cliente.map(cliente => (
                      <option key={cliente.idCliente} value={cliente.idCliente}>
                        {cliente.idCliente}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <label htmlFor="formGroupExampleInput">id Producto</label>
                  <select className="form-select" aria-label="Default select example" style={{ backgroundColor: "lightgray" }} value={productoSeleccionado  ?? ''} onChange={handleProductoChange}>
                  <option value="">Seleccione un producto</option>
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
                  <input type="number" className="form-control shadow-none" value={calificaciont} onChange={(e) => setCalificaciont(Number(e.target.value))} />
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
                  <button type="button" onClick={() => { setIsOpen(false); if (setCalificacionB) { setCalificacionB(null) } }}>Cerrar</button>
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