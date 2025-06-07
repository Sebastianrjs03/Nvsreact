import React, { useEffect, useState } from "react";
import "../../styles/pages/Carrito.css";
import MenuCarrito from "../../components/Carrito/MenuCarrito";
import BodyCarrito from "../../components/Carrito/BodyCarrito";
import CartCarrito from "../../components/Carrito/CartCarrito";
import ResumenCarrito from "../../components/Carrito/ResumenCarrito";
import DetalleResumenCarrito from "../../components/Carrito/DetalleResumenCarrito";
import { ApiPrivate } from "../../hooks/UseFetch";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

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
  const token = localStorage.getItem("token");
  const rol = localStorage.getItem("rol");
  const Navigate = useNavigate();
  const ids = JSON.parse(localStorage.getItem("ids") || "[]").map(Number);

  useEffect(() => {
    const fetchCarrito = async () => {
      if (ids.length > 0) {
        const data = await ApiPrivate("obtenerCarrito", { ids });

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

  const handleComprar = async () => {
    if (!token && rol !== "1") {
      Swal.fire({
        title: "Necesitas iniciar sesión",
        text: "Para completar la compra necesitas iniciar sesión.",
        icon: "warning",
        background: "#2a0054",
        color: "#ffffff",
        iconColor: "#ffcc00",
        cancelButtonColor: "#613f92",
        confirmButtonColor: "#7e4efc",
        cancelButtonText: "Cancelar",
        confirmButtonText: "Ingresar",
        showCancelButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          Navigate("/iniciarSesion");
        }
      });
    } else if (ids.length === 0) {
        Swal.fire({
        title: "No hay productos en el carrito",
        text: "Por favor, agrega productos antes de proceder a la compra.",
        icon: "warning",
        background: "#2a0054",
        color: "#ffffff",
        iconColor: "#ffcc00",
        cancelButtonColor: "#613f92",
        confirmButtonColor: "#7e4efc",
        confirmButtonText: "Aceptar",
      });
    } else if (token && rol === "1") {
      Navigate("/pagos");
    }
  };

  useEffect(() => {
    const resumen = productos.map((p) => ({
      id: p.idProducto,
      nombre: p.nombreProducto,
      cantidad: p.cantidadSeleccionada,
      precioUnitario: p.totalProducto,
      iva: 0.19,
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
                productos.length > 2 ? "scrollable" : ""
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
              Precio={(
                prod.totalProducto * prod.cantidadSeleccionada
              ).toString()}
              Total=""
            />
          ))}

          <DetalleResumenCarrito
            Detalle="Subtotal"
            Precio={subtotal.toFixed(0)}
            Total=""
          />
          <DetalleResumenCarrito
            Detalle="IVA (19%)"
            Precio={iva.toFixed(0)}
            Total=""
          />
          <DetalleResumenCarrito
            Detalle="Total a pagar"
            Precio={total.toFixed(0)}
            Total="total"
          />
          <button onClick={handleComprar} className="resumenCarrito-botonPago">
            Continuar
          </button>
        </ResumenCarrito>
      </main>
      
    </React.Fragment>
  );
}

export default Carrito;
