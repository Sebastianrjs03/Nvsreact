//hooks
import { useState, useEffect } from "react";
import { ApiPrivate, ApiPublic } from '../../../../hooks/UseFetch';
//librerias
import Swal from "sweetalert2";
//types
import { Factura, ClienteCon, FPC } from "./../../Types/TypesDatos";

interface MyModalProps {
  get: () => void;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setFacturaB?: React.Dispatch<React.SetStateAction<Factura | null>>;
  idFactura?: number;
  modal: string;
}


const ExampleModal: React.FC<MyModalProps> = ({ idFactura, setIsOpen, setFacturaB, modal, get }) => {

  const [Factura, setFactura] = useState<Factura | null>(null);
  const [cliente, setCliente] = useState<ClienteCon[]>([]);
  const [fecha, setFecha] = useState("");
  const [iva, setIva] = useState(0.19);
  const [base, setBase] = useState(0);
  const [total, setTotal] = useState(0);
  const [clienteSeleccionado, setClienteSeleccionado] = useState<number | undefined>(0);
  const [FormaPagoSeleccionado, setFormaPagoSeleccionado] = useState<string | undefined>("PayPal");


  useEffect(() => {
    const Fetchfactura = async () => {
      try {
        const result = await ApiPublic("Consultar_ClienteConUsuario");

        if (result) {
          setCliente(result);
        } else {
          console.error('No se recibieron datos o los datos están en un formato inesperado');
        }
        if (modal === "Editar") {
          const resultC = await ApiPublic("ConsultarPorID_Factura",
            {
              id1: idFactura,
              nombre1: "idFactura",
            }
          )
          if (resultC) { setFactura(resultC[0]) }
        }
      } catch (error) {
        console.error('Error cargando clientes :', error);
      }
    };
    Fetchfactura();
  }, []);

  useEffect(() => {
    if (Factura) {
      setFecha(Factura.fechaFactura?.toString());
      setIva(Factura.iva);
      setBase(Factura.base);
      setTotal(Factura.totalCompra);
      setClienteSeleccionado(Factura.idCliente);
      setFormaPagoSeleccionado(Factura.idFormaPago);
    }
  }, [Factura]);

    useEffect(() => {
      const ivaDeBase = base * iva
    setTotal(base  + ivaDeBase);
    }, [base]);

  const handleClienteChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setClienteSeleccionado(Number(e.target.value));
  };

  const Validar = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      idFactura: idFactura,
      fecha: fecha,
      iva: iva,
      base: base,
      total: total,
      cliente: clienteSeleccionado,
      formaPago: FormaPagoSeleccionado,

    };
    if (clienteSeleccionado == 0) {
      Swal.fire({
        icon: "error",
        title: "Acción fallida",
        text: "Cliente en 0",
      });
    } else if (fecha === "") {
      Swal.fire({
        icon: "error",
        title: "Acción fallida",
        text: "Fecha invalida elija una fecha",
      });
    } else if (iva <= 0 || iva > 0.19) {
      Swal.fire({
        icon: "error",
        title: "Acción fallida",
        text: "iva en 0 o mayor al 0.19",
      });
    } else if (base <= 0) {
      Swal.fire({
        icon: "error",
        title: "Acción fallida",
        text: "base menor o igual a 0",
      });
    } else if (total <= 0 || total <= base) {
      Swal.fire({
        icon: "error",
        title: "Acción fallida",
        text: "total menor o igual a cero o base",
      });
    } else if (modal === "Agregar") {
      Agregar(data);
    } else if (modal === "Editar") {
      Editar(data);
    }
  };

  const Agregar = async (data: any) => {
    const response = await ApiPrivate("Crear_Factura", data);
    if (response) {
      Swal.fire({
        icon: "success",
        title: "Acción exitosa",
        text: "Factura registrada",
      }).then(async () => {
        get();
        if (setFacturaB) {
          setFacturaB(null);
        }
        setIsOpen(false);
      });
    } else if (!response) {
      if (setFacturaB) {
        setFacturaB(null);
      }
      setIsOpen(false);
      get();
    }
  }

  const Editar = async (data: any) => {
    const response = await ApiPrivate("Editar_Factura", data);
    if (response) {
      Swal.fire({
        icon: "success",
        title: "Acción exitosa",
        text: "Factura Editada",
      }).then(async () => {
        if (setFacturaB) {
          setFacturaB(null);
        }
        setIsOpen(false);
        get();
      });
    } else if (!response) {
      Swal.fire({
        icon: "error",
        title: "Acción fallida",
        text: "Factura no Editada",
      }).then(() => {
        if (setFacturaB) {
          setFacturaB(null);
        }
        setIsOpen(false);
      });
    }
  }

  return (

    <div className="modal-backdrop">
      <div className="modal_content">
        <div className="modal-header">
          <h1 className="modal-title fs-5" id="exampleModalLabel" style={{ marginLeft: "5px" }}>{modal} Factura</h1>
          <button type="button" className="btn-close" onClick={() => { setIsOpen(false); if (setFacturaB) { setFacturaB(null) } }} aria-label="Close" style={{ marginLeft: "53%" }}></button>
        </div>
        <hr />
        <div className="modal-body" style={{ marginLeft: "15px" }}>
          <form onSubmit={Validar} encType="multipart/form-data">
            <div className="form-group row">
              <div className="row" style={{ marginBottom: "12px" }}>
                <div className="col" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <label htmlFor="formGroupExampleInput">fecha Factura</label>
                  <input type="date" className="form-control shadow-none" value={fecha} onChange={(e) => setFecha(e.target.value)} />
                </div>
                <div className="col" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <label htmlFor="formGroupExampleInput">Iva</label>
                  <input type="number" step="0.01" className="form-control shadow-none" value={iva} readOnly />
                </div>
              </div>
              <div className="row" style={{ marginBottom: "12px" }}>
                <div className="col" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <label htmlFor="formGroupExampleInput">Base Compra</label>
                  <input type="number" className="form-control shadow-none" value={base} onChange={(e) => setBase(Number(e.target.value))} onFocus={(e) => { if (e.target.value === "0") { e.target.value = ""; } }} />
                </div>
                <div className="col" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <label htmlFor="formGroupExampleInput">Total Compra</label>
                  <input type="text" className="form-control shadow-none" value={FPC.format(total)} readOnly />
                </div>
              </div>
              <div className="row" style={{ display: "flex", alignItems: "center" }}>
                <div className="col" style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "15px"}}>
                  <label htmlFor="formGroupExampleInput">Nuestros Clientes</label>
                  <select className="form-select" aria-label="Default select example" style={{ backgroundColor: "lightgray", alignItems: "center", marginBottom: "10px", maxHeight: "100px" }} value={clienteSeleccionado ?? ''} onChange={handleClienteChange}>
                    {clienteSeleccionado == 0 && <option value="">Seleccione un Cliente</option>}                    {clienteSeleccionado
                      ? cliente
                        .filter((cli) => cli.idCliente !== clienteSeleccionado)
                        .map((cli) => (
                          <option key={cli.idCliente} value={cli.idCliente}>
                            {cli.idCliente}-{cli.nombreUsuario} {cli.apellidoUsuario}
                          </option>
                        )) :
                      cliente
                        .map((cli) => (
                          <option key={cli.idCliente} value={cli.idCliente}>
                            {cli.idCliente}-{cli.nombreUsuario} {cli.apellidoUsuario}
                          </option>
                        ))
                    }
                  </select>
                </div>
                <div className="col" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <label htmlFor="formGroupExampleInput">Metodo de pago</label>
                  <input type="text" className="form-control shadow-none" value={FormaPagoSeleccionado} readOnly />
                </div>
              </div>
              <div className="row">
                <div className="col" style={{ display: "flex", justifyContent: "center", gap: "35px" }}>
                  <button type="button" className="ButtonCloseModal" onClick={() => { setIsOpen(false); if (setFacturaB) { setFacturaB(null) } }}>Cerrar</button>
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