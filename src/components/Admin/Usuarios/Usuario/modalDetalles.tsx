//hooks
import { useEffect, useState } from 'react';
import { ApiPublic } from '../../../../hooks/UseFetch';
//types
import { Usuario, Cliente, Administrador } from "./../../Types/TypesDatos";

interface MyModalProps {
    setIsOpenD: React.Dispatch<React.SetStateAction<boolean>>;
    setUsuarioB: React.Dispatch<React.SetStateAction<Usuario | null>>;
    idUsuario: number;
    idRol: number;
}
const ModalDetalles: React.FC<MyModalProps> = ({ idUsuario, setIsOpenD, setUsuarioB, idRol }) => {

    const [cliente, setCliente] = useState<Cliente | null>(null);
    const [Administrador, setAdministrador] = useState<Administrador | null>(null);
    const [input1, setInput1] = useState("");
    const [input2, setInput2] = useState("");

    useEffect(() => {
        const FetchUsu = async () => {
            if (idRol == 1) {
                const resultC = await ApiPublic("ConsultarPorID_Cliente", {
                    id1: idUsuario,
                    nombre1: "idCliente",
                });
                if (resultC) {
                    setCliente(resultC);
                }
            } else {
                const resultA = await ApiPublic("ConsultarPorID_Administrador", {
                    id1: idUsuario,
                    nombre1: "idAdministrador",
                });
                if (resultA) {
                    setAdministrador(resultA);
                }
            }
        };

        FetchUsu();
    }, [idUsuario]);

    useEffect(() => {
        if (cliente) {
            setInput1(cliente.direccion);
            setInput2(cliente.complemento);
        } else if (Administrador) {
            setInput1(Administrador.documentoAdministrador);
            setInput2(Administrador.pf_fk_tdoc);
        }
    }, [cliente, Administrador]);

    return (
        <div className="modal-backdrop">
            <div className="modal_content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel" style={{ marginLeft: "5px", width: "80%" }}>Rol {idRol == 1 ? <span>Cliente</span> : <span>Administrador</span>}</h1>
                    <button type="button" className="btn-close" onClick={() => { setIsOpenD(false); if (setUsuarioB) { setUsuarioB(null) } }} aria-label="Close" style={{ marginLeft: "10%" }}></button>
                </div>
                <hr />
                <div className="modal-body" style={{ marginLeft: "15px" }}>
                    <div className="form-group row">
                        <div className="row" style={{ marginBottom: "12px" }}>
                            <div className="col" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                {idRol == 1 ? <label htmlFor="formGroupExampleInput">Direccion Usuario</label> :
                                    <label htmlFor="formGroupExampleInput">Documento administrador</label>}
                                <input type="text" className="form-control shadow-none" value={input1} readOnly />
                            </div>
                            <div className="col" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                {idRol == 1 ? <label htmlFor="formGroupExampleInput">Complemento</label> :
                                    <label htmlFor="formGroupExampleInput">Tipo Documento</label>}
                                <input type="text" className="form-control shadow-none" value={input2} readOnly />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col" style={{ display: "flex", justifyContent: "center", gap: "35px" }}>
                                <button type="button" className='ButtonCloseModal' onClick={() => { setIsOpenD(false); if (setUsuarioB) { setUsuarioB(null) } }}>Cerrar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalDetalles;