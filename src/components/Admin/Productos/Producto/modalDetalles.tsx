//hooks
import { useEffect, useState } from 'react';
import { ApiPublic } from '../../../../hooks/UseFetch';
//types
import { ProductoA, Juego, Consola } from "./../../Types/TypesDatos";

interface MyModalProps {
    setIsOpenD: React.Dispatch<React.SetStateAction<boolean>>;
    setProductoB: React.Dispatch<React.SetStateAction<ProductoA | null>>;
    idProducto: number;
    idTipo: string;
}
const ModalDetalles: React.FC<MyModalProps> = ({ idProducto, setIsOpenD, setProductoB, idTipo }) => {

    const [Consola, setConsola] = useState<Consola | null>(null);
    const [Juego, setJuego] = useState<Juego | null>(null);
    const [input1, setInput1] = useState("");
    const [input2, setInput2] = useState("");

    useEffect(() => {
        const FetchUsu = async () => {
            if (idTipo === "Videojuego") {
                const resultC = await ApiPublic("ConsultarPorID_Juego", {
                    id1: idProducto,
                    nombre1: "idJuego",
                });
                if (resultC) {
                    setJuego(resultC[0]);
                }
            } else {
                const resultA = await ApiPublic("ConsultarPorID_Consola", {
                    id1: idProducto,
                    nombre1: "idConsola",
                });
                if (resultA) {
                    setConsola(resultA[0]);
                }
            }
        };
        FetchUsu();
    }, [idProducto]);

    useEffect(() => {
        if (Consola) {
            setInput1(Consola.sobreConsola);
        } else if (Juego) {
            setInput1(Juego.anoLanzamiento?.toString());
            setInput2(Juego.descripcionJuego);
        }
    }, [Consola, Juego]);

    return (
        <div className="modal-backdrop">
            <div className="modal_content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel" style={{ marginLeft: "5px", width: "80%" }}>Tipo Producto {idTipo === "Consola" ? <span>Consola</span> : <span>Juego</span>}</h1>
                    <button type="button" className="btn-close" onClick={() => { setIsOpenD(false); if (setProductoB) { setProductoB(null) } }} aria-label="Close" style={{ marginLeft: "10%" }}></button>
                </div>
                <hr />
                <div className="modal-body" style={{ marginLeft: "15px" }}>
                    <div className="form-group row">
                        <div className="row" style={{ marginBottom: "12px"}}>
                            {idTipo === "Videojuego" ?
                            <div className="col" style={{ display: "flex", flexDirection: "column", alignItems: "center"}}>
                                 <label htmlFor="formGroupExampleInput">Año Lanzamiento</label> 
                                 <input type="date" className="form-control shadow-none" value={input1} readOnly />
                            </div>:
                            <div className="col" style={{ display: "flex", flexDirection: "column", alignItems: "center"}}>
                                 <label htmlFor="formGroupExampleInput">Sobre Consola</label> 
                                 <textarea className="form-control shadow-none" value={input1} readOnly />
                            </div>}  
                        </div>
                        {idTipo === "Videojuego" && <div className="row" style={{ marginBottom: "12px"}}>
                            <div className="col" style={{ display: "flex", flexDirection: "column", alignItems: "center"}}>
                                <label htmlFor="formGroupExampleInput">Descripcion Videojuego</label>  
                                <textarea className="form-control shadow-none" value={input2} readOnly/>
                            </div>
                        </div>}
                        <div className="row">
                            <div className="col" style={{ display: "flex", justifyContent: "center", gap: "35px" }}>
                                <button type="button" className='ButtonCloseModal' onClick={() => { setIsOpenD(false); if (setProductoB) { setProductoB(null) } }}>Cerrar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalDetalles;