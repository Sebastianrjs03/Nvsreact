import { useRef } from "react";
import "../../styles/Tienda/ProductosCards.css";
import CardProducto from "./Card";

function ProductosCards() {
  const contenedorRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = (direction: "left" | "right") => {
    const contenedor = contenedorRef.current;
    if (!contenedor) return;

    const firstCard = contenedor.querySelector(".card-producto") as HTMLElement | null;
    const cardWidth = firstCard?.offsetWidth || 200; 

    contenedor.scrollLeft += direction === "left" ? -cardWidth : cardWidth;
  };

  return (
    <section className="productosCards-contenedor">
      <i
        id="left"
        className="fa-solid fa-chevron-left"
        onClick={() => handleScroll("left")}
        style={{ cursor: "pointer" }}
      ></i>

      <div className="cards-contenedor" ref={contenedorRef}>
        <CardProducto />
        <CardProducto />
        <CardProducto />
        <CardProducto />
        <CardProducto />
        <CardProducto />
        <CardProducto />
        <CardProducto />
        <CardProducto />
      </div>

      <i
        id="right"
        className="fa-solid fa-chevron-right"
        onClick={() => handleScroll("right")}
        style={{ cursor: "pointer" }}
      ></i>
    </section>
  );
}

export default ProductosCards;
