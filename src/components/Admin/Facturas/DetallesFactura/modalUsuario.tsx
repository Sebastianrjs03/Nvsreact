//hooks
import { useState, useEffect } from "react";
import { ApiPrivate, ApiPublic } from '../../../../hooks/UseFetch';
//librerias
import Swal from "sweetalert2";
//types
import { DetaFactura, Factura, ProductoA } from "./../../Types/TypesDatos";

interface MyModalProps {
  get: () => void;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setFacturaB?: React.Dispatch<React.SetStateAction<DetaFactura | null>>;
  idFactura?: number;
  idProducto?: number;
  modal: string;
}


const ExampleModal: React.FC<MyModalProps> = ({ idFactura, idProducto, setIsOpen, setFacturaB, modal, get }) => {

  const [DetaFactura, setDetaFactura] = useState<DetaFactura | null>(null);
  const [Facturas, setFacturas] = useState<Factura[]>([]);
  const [Productos, setProductos] = useState<ProductoA[]>([]);
  const [cantidad, setCantidad] = useState(0);
  const [valor, setValor] = useState(0);
  const [total, setTotal] = useState(0);
  const [FacturaSeleccionada, setFacturaSeleccionada] = useState<number | undefined>(0);
  const [ProductoSeleccionado, setProductoSeleccionado] = useState<number | undefined>(0);


  useEffect(() => {
    const Fetchfactura = async () => {
      try {
        const result = await ApiPublic("Consultar_Factura");
        const resultP = await ApiPublic("Consultar_Producto");

        if (result && resultP) {
          setFacturas(result);
          setProductos(resultP);
        } else {
          console.error('No se recibieron datos o los datos están en un formato inesperado');
        }
        if (modal === "Editar") {
          const resultC = await ApiPublic("ConsultarPorID_DetalleFactura",
            {
              id1: idFactura,
              id2: idProducto,
              nombre1: "fk_pk_Factura",
              nombre2: "fk_pk_Producto",
            }
          )
          if (resultC) { setDetaFactura(resultC[0]) }
        }
      } catch (error) {
        console.error('Error cargando clientes y formas:', error);
      }
    };
    Fetchfactura();
  }, []);

  useEffect(() => {
    if (DetaFactura) {
      setCantidad(DetaFactura.cantidadProducto);
      setValor(DetaFactura.valorUnitarioProducto);
      setTotal(DetaFactura.totalProducto);
      setFacturaSeleccionada(DetaFactura.fk_pk_Factura);
      setProductoSeleccionado(DetaFactura.fk_pk_Producto);
    }
  }, [DetaFactura]);

  useEffect(() => {
    setTotal(valor * cantidad);
  }, [valor, cantidad]);

  useEffect(() => {
  const seleccionado = Productos.find(Pro => Pro.idProducto === ProductoSeleccionado);
    setValor(seleccionado ? seleccionado.precioProducto : 0);
  }, [ProductoSeleccionado]);

  const handleFacturaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFacturaSeleccionada(Number(e.target.value));
  };

  const handleProductoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setProductoSeleccionado(Number(e.target.value));
  };

  const Validar = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      factura: FacturaSeleccionada,
      producto: ProductoSeleccionado,
      cantidad: cantidad,
      valor: valor,
      total: total
    };
    if (cantidad <= 0 || valor <= 0 || total <= 0 || total < valor * cantidad || total > valor * cantidad) {
      Swal.fire({
        icon: "error",
        title: "Acción fallida",
        text: "Complete todos los campos",
      });
      return;
    } else if (modal === "Agregar") {
      if (FacturaSeleccionada == 0 || ProductoSeleccionado == 0) {
        Swal.fire({
          icon: "error",
          title: "Acción fallida",
          text: "Facturta o Producto en 0, seleccione una opcion",
        });
        return;
      }
      Agregar(data);
    } else if (modal === "Editar") {
      Editar(data);
    }
  };

  const Agregar = async (data: any) => {
    const response = await ApiPrivate("Crear_DetalleFactura", data);
    if (response) {
      Swal.fire({
        icon: "success",
        title: "Acción exitosa",
        text: "Detalles Factura registrada",
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
    const response = await ApiPrivate("Editar_DetalleFactura", data);
    if (response) {
      Swal.fire({
        icon: "success",
        title: "Acción exitosa",
        text: "Detalles Factura Editada",
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
        text: "Detalles Factura no Editada",
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
              {modal === "Agregar" && <div className="row" style={{ marginBottom: "12px" }}>
                <div className="col" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <label htmlFor="formGroupExampleInput">Seleccione</label>
                  <select className="form-select" aria-label="Default select example" style={{ backgroundColor: "lightgray", alignItems: "center", marginBottom: "10px" }} value={FacturaSeleccionada ?? ''} onChange={handleFacturaChange}>
                    {FacturaSeleccionada == 0 ? <option value="">Una Factura</option> : <option value={FacturaSeleccionada}>{FacturaSeleccionada}</option>}
                    {FacturaSeleccionada
                      ? Facturas
                        .filter((fac) => fac.idFactura !== FacturaSeleccionada)
                        .map((fac) => (
                          <option key={fac.idFactura} value={fac.idFactura}>
                            {fac.idFactura}
                          </option>
                        )) :
                      Facturas
                        .map((fac) => (
                          <option key={fac.idFactura} value={fac.idFactura}>
                            {fac.idFactura}
                          </option>
                        ))
                    }
                  </select>
                </div>
                <div className="col" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <label htmlFor="formGroupExampleInput">Seleccione</label>
                  <select className="form-select" aria-label="Default select example" style={{ backgroundColor: "lightgray", alignItems: "center", marginBottom: "10px" }} value={ProductoSeleccionado || ''} onChange={handleProductoChange}>
                    {ProductoSeleccionado == 0 ? <option value="">Un Producto</option> : <option value={ProductoSeleccionado}>{ProductoSeleccionado}</option>}
                    {ProductoSeleccionado
                      ? Productos
                        .filter((pro) => pro.idProducto !== ProductoSeleccionado)
                        .map((pro) => (
                          <option key={pro.idProducto} value={pro.idProducto}>
                            {pro.nombreProducto}
                          </option>
                        )) :
                      Productos
                        .map((pro) => (
                          <option key={pro.idProducto} value={pro.idProducto}>
                            {pro.nombreProducto}
                          </option>
                        ))
                    }
                  </select>
                </div>
              </div>}
              <div className="row" style={{ marginBottom: "12px" }}>
                <div className="col" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <label htmlFor="formGroupExampleInput">Cantidad</label>
                  <input type="number" step="0.01" className="form-control shadow-none" value={cantidad} onChange={(e) => setCantidad(Number(e.target.value))} onFocus={(e) => { if (e.target.value === "0") { e.target.value = ""; } }} />
                </div>
                <div className="col" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <label htmlFor="formGroupExampleInput">Valor Unitario</label>
                  <input type="number" step="0.01" className="form-control shadow-none" value={valor} readOnly/>
                </div>
              </div>
              <div className="row" style={{ marginBottom: "12px" }}>
                <div className="col" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <label htmlFor="formGroupExampleInput">Total Producto</label>
                  <input type="number" step="0.01" className="form-control shadow-none" value={total} readOnly />
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