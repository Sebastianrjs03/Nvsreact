import { useEffect, useState } from "react";
import "../../styles/DetallesProducto/calificacionesProducto.css";
import { ApiPublic, ApiPrivate } from "../../hooks/UseFetch";
import Swal from "sweetalert2";

interface Props {
    idProducto: string;
}

interface Calificacion {
    idCliente: string;
    numeroCalificacion: number;
    comentarioCalificacion: string;
}

function CalificacionesProducto({ idProducto }: Props) {
    const [modalAbierto, setModalAbierto] = useState(false);
    const [comentario, setComentario] = useState("");
    const [calificacionSeleccionada, setCalificacionSeleccionada] = useState(0);
    const [calificaciones, setCalificaciones] = useState<Calificacion[]>([]);

    const abrirModal = () => setModalAbierto(true);
    const cerrarModal = () => setModalAbierto(false);

    useEffect(() => {
        const obtener = async () => {
            try {
                const res = await ApiPublic("obtenerCalificacionesProducto", { id: idProducto });
                setCalificaciones(res || []);
            } catch (error) {
                console.error("Error al obtener calificaciones", error);
            }
        };
        obtener();
    }, [idProducto]);

    const promedio = calificaciones.length
        ? Math.round(calificaciones.reduce((acc, cur) => acc + cur.numeroCalificacion, 0) / calificaciones.length)
        : 0;

    const enviarCalificacion = async () => {
        try {
            if (calificacionSeleccionada === 0) {
                return Swal.fire("Calificación requerida", "Selecciona una puntuación.", "warning");
            }

            // Esto lo puedes ajustar según cómo almacenes la sesión
            const idCliente = localStorage.getItem("idCliente");

            if (!idCliente) {
                return Swal.fire("No autenticado", "Inicia sesión para reseñar.", "info");
            }

            const data = {
                idCliente: Number(idCliente),
                idProducto: Number(idProducto),
                numeroCalificacion: calificacionSeleccionada * 20, // de 1 a 5 → 20, 40...100
                comentarioCalificacion: comentario,
            };

            await ApiPrivate("crearCalificacionProducto", data);
            Swal.fire("¡Gracias!", "Tu reseña ha sido enviada.", "success");

            cerrarModal();
            setComentario("");
            setCalificacionSeleccionada(0);

            // Recargar calificaciones
            const res = await ApiPrivate("obtenerCalificacionesProducto", { id: idProducto });
            setCalificaciones(res || []);

        } catch (error) {
            console.error("Error al enviar calificación:", error);
            Swal.fire("Error", "No se pudo enviar la reseña.", "error");
        }
    };

    return (
        <section className="calificacionesProducto">
            <article className="calificacionesProducto-reseñasContenedor">
                {calificaciones.slice(0, 3).map((cal, i) => (
                    <div key={i} className="calificacionesProducto-reseñas">
                        <strong>Cliente #{cal.idCliente}</strong>
                        <div>{"⭐".repeat(Math.round(cal.numeroCalificacion / 20))}</div>
                        <p>{cal.comentarioCalificacion}</p>
                    </div>
                ))}
            </article>

            <div className="calificacionesProducto-promedio">
                <div className="calificacionesProducto-circulo">{promedio}</div>
                <div className="calificacionesProducto-info">
                    <strong>Puntuación media de las reseñas</strong>
                    <p>Basada en {calificaciones.length} reseñas</p>
                </div>
                <button className="calificacionesProducto-botonReseña" onClick={abrirModal}>
                    Reseñar
                </button>
            </div>

            {modalAbierto && (
                <div
                    className="calificacionesProducto-modal"
                    onClick={(e) => {
                        if ((e.target as HTMLElement).className === "calificacionesProducto-modal") cerrarModal();
                    }}
                >
                    <div className="calificacionesProducto-modalContent">
                        <span className="calificacionesProducto-cerrar" onClick={cerrarModal}>
                            &times;
                        </span>
                        <h2>Reseña</h2>
                        <p>Calificación:</p>
                        <div className="calificacionesProducto-estrellas">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <span
                                    key={i}
                                    className={i <= calificacionSeleccionada ? "estrella-activa" : ""}
                                    onClick={() => setCalificacionSeleccionada(i)}
                                    style={{ cursor: "pointer" }}
                                >
                                    ⭐
                                </span>
                            ))}
                        </div>
                        <p>Comentario:</p>
                        <textarea
                            className="calificacionesProducto-textareaModal"
                            maxLength={100}
                            value={comentario}
                            onChange={(e) => setComentario(e.target.value)}
                            placeholder="Déjanos un comentario..."
                        />
                        <div className="calificacionesProducto-contador">{comentario.length}/100</div>
                        <button className="calificacionesProducto-botonEnviar" onClick={enviarCalificacion}>
                            Enviar
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
}

export default CalificacionesProducto;
