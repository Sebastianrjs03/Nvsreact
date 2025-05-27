import React, { useEffect, useState } from "react";
import "../../styles/pages/Carrito.css";
import MenuCarrito from "../../components/Carrito/MenuCarrito";
import BodyCarrito from "../../components/Carrito/BodyCarrito";
import CartCarrito from "../../components/Carrito/CartCarrito";
import ResumenCarrito from "../../components/Carrito/ResumenCarrito";
import DetalleResumenCarrito from "../../components/Carrito/DetalleResumenCarrito";
import { ApiPrivate } from "../../hooks/UseFetch";

interface Producto {
  idProducto: string;
  nombreProducto: string;
  totalProducto: number;
  aux_plataforma: string;
  stock: number;
  cantidadSeleccionada: number; 
}

function Carrito() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [subtotal, setSubtotal] = useState(0);
  const [iva, setIva] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchCarrito = async () => {
      const ids = JSON.parse(localStorage.getItem("ids") || "[]").map(Number);
      console.log("IDs en carrito (localStorage):", ids);

      if (ids.length > 0) {
        const data = await ApiPrivate("obtenerCarrito", { ids });
        console.log("Datos productos recibidos:", data);

        if (Array.isArray(data)) {
          const productosConCantidad = data.map((p) => ({
            ...p,
            cantidadSeleccionada: 1, 
          }));
          setProductos(productosConCantidad);
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

  useEffect(() => {
    const resumen = productos.map((p) => ({
      nombre: p.nombreProducto,
      cantidad: p.cantidadSeleccionada,
      precioUnitario: p.totalProducto,
      total: p.totalProducto * p.cantidadSeleccionada,
    }));

    const newSubtotal = resumen.reduce((acc, item) => acc + item.total, 0);
    const newIva = newSubtotal * 0.19;
    const newTotal = newSubtotal + newIva;

    setSubtotal(newSubtotal);
    setIva(newIva);
    setTotal(newTotal);

    localStorage.setItem(
      "resumenPago",
      JSON.stringify({
        productos: resumen,
        subtotal: newSubtotal,
        iva: newIva,
        total: newTotal,
      })
    );
  }, [productos]);

  const handleDeleteProducto = (id: string) => {
    const ids = JSON.parse(localStorage.getItem("ids") || "[]");
    const nuevosIds = ids.filter(
      (storedId: string | number) => storedId.toString() !== id.toString()
    );
    localStorage.setItem("ids", JSON.stringify(nuevosIds));
    setProductos(productos.filter((p) => p.idProducto !== id));
  };

  const handleCantidadChange = (id: string, nuevaCantidad: number) => {
    const productosActualizados = productos.map((p) =>
      p.idProducto === id ? { ...p, cantidadSeleccionada: nuevaCantidad } : p
    );
    setProductos(productosActualizados);
  };

  return (
    <React.Fragment>
      <MenuCarrito />
      <main className="carrito-main">
        <BodyCarrito>
          {productos.length === 0 ? (
            <p>No hay productos en el carrito.</p>
          ) : (
            <div
              className={`bodyCarrito-contenedorCarts ${
                productos.length > 3 ? "scrollable" : ""
              }`}
            >
              {productos.map((prod) => (
                <CartCarrito
                  imagen={prod.idProducto}
                  key={prod.idProducto}
                  NombreProducto={prod.nombreProducto}
                  Consola={prod.aux_plataforma}
                  Precio={prod.totalProducto.toString()}
                  stock={prod.stock}
                  cantidadSeleccionada={prod.cantidadSeleccionada}
                  onDelete={() => handleDeleteProducto(prod.idProducto)}
                  onCantidadChange={(cantidad) =>
                    handleCantidadChange(prod.idProducto, cantidad)
                  }
                />
              ))}
            </div>
          )}
        </BodyCarrito>

        <ResumenCarrito>
          {productos.map((prod) => (
            <DetalleResumenCarrito
              key={prod.idProducto}
              Detalle={`${prod.nombreProducto} x(${prod.cantidadSeleccionada})`}
              Precio={(prod.totalProducto * prod.cantidadSeleccionada).toString()}
              Total=""
            />
          ))}

          <DetalleResumenCarrito Detalle="Subtotal" Precio={subtotal.toFixed(0)} Total="" />
          <DetalleResumenCarrito Detalle="IVA (19%)" Precio={iva.toFixed(0)} Total="" />
          <DetalleResumenCarrito Detalle="Total a pagar" Precio={total.toFixed(0)} Total="total" />
        </ResumenCarrito>
      </main>
    </React.Fragment>
  );
}

export default Carrito;
