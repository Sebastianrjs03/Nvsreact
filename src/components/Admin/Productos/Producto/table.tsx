import { Link } from "react-router-dom";

//hooks
import { Delete } from "../../../../hooks/useCrud.tsx";

//Components
import ModalDetalles from "./modalDetalles.tsx";

//Types
import { ProductoA } from "../../Types/TypesDatos.tsx";
import { useState } from "react";

interface MyModalProps {
  getProducto: () => void;
  data: ProductoA[];
}

const TableP: React.FC<MyModalProps> = ({ data, getProducto }) => {

    const [selectedProducto, setSelectedProducto] = useState<ProductoA | null>(null);
    const [isOpenD, setIsOpenD] = useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div className="contenedor_Tabla" style={{ width: "100%" }}>
        <table className="table table-striped table-dark table_Admin">
          <thead>
            <tr>
              <th scope="col">Id Producto</th>
              <th scope="col">Nombre Producto</th>
              <th scope="col">Precio Producto</th>
              <th scope="col">Iva Producto</th>
              <th scope="col">Garantia Producto</th>
              <th scope="col">Tipo Producto</th>
              <th scope="col">Id Administrador</th>
              <th scope="col">Cantidad</th>
              <th scope="col">Stock</th>
              <th scope="col" style={{ maxWidth: "45px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Detalles</th>
              <th scope="col" style={{ maxWidth: "50px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Editar</th>
              <th scope="col" style={{ maxWidth: "45px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {data.map((Producto) => (
              <tr key={`${Producto.idProducto}`}>
                <td>{Producto.idProducto}</td>
                <td>{Producto.nombreProducto}</td>
                <td>{Producto.precioProducto}</td>
                <td>{Producto.ivaProducto}</td>
                <td>{Producto.garantiaProducto}</td>
                <td>{Producto.idTipoProducto}</td>
                <td>{Producto.idAdministrador_crear}</td>
                <td>{Producto.cantidad}</td>
                <td>{Producto.stock == 1 ? "Activo" : "Inactivo"}</td>
                <td style={{ maxWidth: "45px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => { setSelectedProducto(Producto); setIsOpenD(true) }}
                  >
                    <i className="fa-solid fa-hand-point-up"></i>
                  </button>
                </td>
                <td style={{ maxWidth: "50px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {Producto.idTipoProducto === "Videojuego" ?
                    <Link to={`/Administrador/Agregar_Juego/${Producto.idProducto}`}>
                      <button type="button" className="btn btn-primary">
                        <i className="fa-solid fa-pen"></i>
                      </button>
                    </Link> :
                    <Link to={`/Administrador/Agregar_Consola/${Producto.idProducto}`}>
                      <button type="button" className="btn btn-primary">
                        <i className="fa-solid fa-pen"></i>
                      </button>
                    </Link>}
                </td>
                <td style={{ maxWidth: "45px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  <button className="btn btn-danger" onClick={() => Delete(Producto.idProducto, "idProducto", getProducto, "Eliminar_Producto")}>
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </td>
              </tr>))}
          </tbody>
        </table>
      </div>
      <div>
        <section className="BotonAgregar">
          <Link to={`/Administrador/Agregar_Consola/`}>
          <button
            type="button"
            className="btn btn-primary"
            style={{ backgroundColor: '#4415A2', border: 'none' }}
          >
            <i className="fa-solid fa-plus"></i> Nuevo Producto
          </button>
          </Link>
        </section>
        {isOpenD && selectedProducto && (
            <ModalDetalles
              idProducto={selectedProducto.idProducto}
              idTipo={selectedProducto.idTipoProducto}
              setProductoB={setSelectedProducto}
              setIsOpenD={setIsOpenD}
            />
          )}
      </div>
    </div>
  )

}

export default TableP