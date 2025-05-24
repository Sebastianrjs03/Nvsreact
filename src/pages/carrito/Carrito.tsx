import React, { useEffect, useState } from "react";
import "../../styles/pages/Carrito.css"
import MenuCarrito from "../../components/Carrito/MenuCarrito"
import BodyCarrito from "../../components/Carrito/BodyCarrito"
import CartCarrito from "../../components/Carrito/CartCarrito"
import ResumenCarrito from "../../components/Carrito/ResumenCarrito"
import DetalleResumenCarrito from "../../components/Carrito/DetalleResumenCarrito"
import { ApiPrivate } from "../../hooks/UseFetch";

interface Producto {
  idProducto: string;
  nombreProducto: string;
  totalProducto: number;
  aux_plataforma: string;
  stock: number;
}

function Carrito() {
  const [productos, setProductos] = useState<Producto[]>([]);

  useEffect(() => {
    const fetchCarrito = async () => {
      const ids = JSON.parse(localStorage.getItem("ids") || "[]").map(Number);
      console.log("IDs en carrito (localStorage):", ids);

      if (ids.length > 0) {
        const data = await ApiPrivate("obtenerCarrito", { ids });
        console.log("Datos productos recibidos:", data);

        if (Array.isArray(data)) {
          setProductos(data);
        } else {
          console.error("La respuesta no es un arreglo de productos:", data);
          setProductos([]);
        }
      } else {
        console.log("No hay productos en el carrito.");
      }
    };

    fetchCarrito();
  }, []);

  const handleDeleteProducto = (id: string) => {
    const ids = JSON.parse(localStorage.getItem("ids") || "[]");
    const nuevosIds = ids.filter((storedId: string | number) => storedId.toString() !== id.toString());

    localStorage.setItem("ids", JSON.stringify(nuevosIds));
    setProductos(productos.filter((p) => p.idProducto !== id));
  };

  return (
    <React.Fragment>
      <MenuCarrito />
      <main className="carrito-main">
        <BodyCarrito>
          {productos.length === 0 ? (
            <p>No hay productos en el carrito.</p>
          ) : (
            productos.map((prod) => (
              <CartCarrito
                imagen={prod.idProducto}
                key={prod.idProducto}
                NombreProducto={prod.nombreProducto}
                Consola={prod.aux_plataforma}
                Precio={prod.totalProducto.toString()}
                stock={prod.stock}
                onDelete={() => handleDeleteProducto(prod.idProducto)}
              />
            ))
          )}
        </BodyCarrito>

        <ResumenCarrito>
          {productos.map((prod) => (
            <DetalleResumenCarrito
              key={prod.idProducto}
              Detalle={prod.nombreProducto}
              Precio={prod.totalProducto.toString()}
              Total=""
            />
          ))}

          <DetalleResumenCarrito
            Total="total"
            Detalle="SubTotal"
            Precio={productos.reduce((acc, p) => acc + p.totalProducto, 0).toString()}
          />
        </ResumenCarrito>
      </main>
    </React.Fragment>
  );
}

export default Carrito;
