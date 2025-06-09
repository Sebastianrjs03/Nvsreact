//hooks
import { useEffect, useState } from 'react';
import { ApiPrivate } from '../../../hooks/UseFetch';
//types
import { DetallesEnvio, Envio } from "../Types/TypesDatos";

interface MyModalProps {
    setIsOpenD: React.Dispatch<React.SetStateAction<boolean>>;
    setEnvio: React.Dispatch<React.SetStateAction<Envio | null>>;
    idFactura: number;
}
const ModalDetalles: React.FC<MyModalProps> = ({ idFactura, setIsOpenD, setEnvio }) => {

    const [EnvioDetalles, setEnvioDetalles] = useState<DetallesEnvio[]>([]);
    const [nombreUsuario, setNombreUsuario] = useState("");
    const [apellidoUsuario, setApellidoUsuario] = useState("");
    const [fechaFactura, setFechaFactura] = useState("");

    useEffect(() => {
        const FetchUsu = async () => {
            const resultC = await ApiPrivate("Consultar_EnvioAdminDetalles", {
                idFactura: idFactura,
            });
            if (resultC) {
                setEnvioDetalles(resultC);
                setNombreUsuario(resultC[0].nombreUsuario)
                setApellidoUsuario(resultC[0].apellidoUsuario);
                setFechaFactura(resultC[0].fechaFactura);
            }

        };

        FetchUsu();
    }, [idFactura]);

    return (
        <div className="modal-backdrop">
            <div className="modal_content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel" style={{ marginLeft: "5px", width: "80%" }}>Envio para: {nombreUsuario} {apellidoUsuario}</h1>
                    <button type="button" className="btn-close" onClick={() => { setIsOpenD(false); if (setEnvio) { setEnvio(null) } }} aria-label="Close" style={{ marginLeft: "15%" }}></button>
                </div>
                <hr style={{ width: "100%" }}/>
                <div className="modal-body" style={{ marginLeft: "15px" }}>
                    <div className="form-group row">
                        {EnvioDetalles.map((env) => (
                            <div>
                                <div className="row" style={{ marginBottom: "12px" }}>
                                    <div className="col" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                        <label htmlFor="formGroupExampleInput">Producto:</label>
                                        <input type="text" className="form-control shadow-none" value={`${env.fk_pk_Producto}-${env.nombreProducto}`} readOnly />
                                    </div>
                                </div>
                                <div className="row" style={{ marginBottom: "12px" }}>
                                    <div className="col" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                        <label htmlFor="formGroupExampleInput">Cantidad:</label>
                                        <input type="text" className="form-control shadow-none" value={env.cantidadProducto} readOnly />
                                    </div>
                                    <div className="col" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                        <label htmlFor="formGroupExampleInput">Total por Producto:</label>
                                        <input type="text" className="form-control shadow-none" value={env.totalProducto} readOnly />
                                    </div>
                                </div>
                            <hr />
                            </div>
                            
                        ))}
                        <div className="row" style={{ marginBottom: "12px" }}>
                            <div className="col" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                <label htmlFor="formGroupExampleInput">Fecha Factura:</label>
                                <input type="text" className="form-control shadow-none" value={fechaFactura} readOnly />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col" style={{ display: "flex", justifyContent: "center", gap: "35px" }}>
                                <button type="button" className='ButtonCloseModal' onClick={() => { setIsOpenD(false); if (setEnvio) { setEnvio(null) } }}>Cerrar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalDetalles;