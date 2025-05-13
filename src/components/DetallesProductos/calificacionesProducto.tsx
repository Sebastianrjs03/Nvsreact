import { useState } from "react";
import "../../styles/DetallesProducto/calificacionesProducto.css";

function CalificacionesProducto() {
    const [modalAbierto, setModalAbierto] = useState(false);
    const [comentario, setComentario] = useState("");

    const abrirModal = () => setModalAbierto(true);
    const cerrarModal = () => setModalAbierto(false);

    return (
        <section className="calificacionesProducto">
            <div className="calificacionesProducto-promedio">
                <div className="calificacionesProducto-circulo">4</div>
                <div className="calificacionesProducto-info">
                    <strong>Puntuación media de las reseñas</strong>
                    <p>Basada en 115 reseñas</p>
                </div>
                <button className="calificacionesProducto-botonReseña" onClick={abrirModal}>
                    Reseñar
                </button>
            </div>

            {modalAbierto && (
                <div className="calificacionesProducto-modal" onClick={(e) => { if (e.target.className === "calificacionesProducto-modal") cerrarModal(); }}>
                    <div className="calificacionesProducto-modalContent">
                        <span className="calificacionesProducto-cerrar" onClick={cerrarModal}>&times;</span>
                        <h2>Reseña</h2>
                        <p>Calificación:</p>
                        <div className="calificacionesProducto-estrellas">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <span key={i}>⭐</span>
                            ))}
                        </div>
                        <p>Comentario:</p>
                        <textarea className="calificacionesProducto-textareaModal"
                            maxLength={100}
                            value={comentario}
                            onChange={(e) => setComentario(e.target.value)}
                            placeholder="Déjanos un comentario..."
                        />
                        <div className="calificacionesProducto-contador">{comentario.length}/100</div>
                        <button className="calificacionesProducto-botonEnviar">Enviar</button>
                    </div>
                </div>
            )}
        </section>
    );
}

export default CalificacionesProducto;

