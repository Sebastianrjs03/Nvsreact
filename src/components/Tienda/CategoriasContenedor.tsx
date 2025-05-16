import { useRef } from "react";
import "../../styles/Tienda/CategoriasContenedor.css";


type ProductosCardsProps = {
  children: React.ReactNode
}


function CategoriasContenedor({children}: ProductosCardsProps) {
  const contenedorRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = (direction: "left" | "right") => {
    const contenedor = contenedorRef.current;
    if (!contenedor) return;

    const firstCard = contenedor.querySelector(".card-producto") as HTMLElement | null;
    const cardWidth = firstCard?.offsetWidth || 200; 

    contenedor.scrollLeft += direction === "left" ? -cardWidth : cardWidth;
  };

  return (
    <section className="categorias-contenedor">
      <i
        id="left"
        className="fa-solid fa-chevron-left"
        onClick={() => handleScroll("left")}
        style={{ cursor: "pointer" }}
      ></i>

      <div className="categoriaCard-contenedor" ref={contenedorRef}>
        {children}
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

export default CategoriasContenedor;
