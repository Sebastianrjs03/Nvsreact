//css
import "../../../../styles/admin/admin-product-consolas.css"

//hooks
import { ApiPublic, ApiPrivate } from "../../../../hooks/UseFetch";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

//components
import VerImagenes from "../Producto/verImagenes";

//Types
import { Marca, AdministradorCon } from "../../Types/TypesDatos";

//librerias
import Swal from "sweetalert2";

const AgregarConsolas = () => {

    const [dataM, setDataM] = useState<Marca[]>([]);
    const [dataA, setDataA] = useState<AdministradorCon[]>([]);

    const { id } = useParams();
    const Navigate = useNavigate();

    const [portada, setPortada] = useState<File | string>("");
    const [visual1, setVisual1] = useState<File | string>("");
    const [visual2, setVisual2] = useState<File | string>("");
    const [visual3, setVisual3] = useState<File | string>("");

    const [DatosConsola, setDatosConsola] = useState({
        idTipoProducto: "Consola",
        nombreProducto: "",
        precioProducto: "",
        garantiaProducto: "",
        idAdmin: "1",
        stock: "1",
        cantidad: "",
        marca: "Nintendo",
        sobre: "",
        fuentesAlimentacion: "",
        opcionesConectividad: "",
        tiposPuertos: "",
        color: "",
        tipoControles: "",
        controlesIncluidos: "",
        controlesSoporta: "",
        tipoProcesador: "",
        resolucionImagen: "",
    });

    const get = async () => {

        const resultMarca = await ApiPublic("Consultar_Marca");
        const resultAdministrador = await ApiPublic("Consultar_AdministradorConUsuario");

        if (resultMarca && resultAdministrador) {
            setDataM(resultMarca);
            setDataA(resultAdministrador);
        } else {
            console.error('No se recibieron datos o los datos están en un formato inesperado');
        }
    }

    const getProducto = async () => {
        if (id) {

            //DATOS
            const resultProducto = await ApiPublic("ConsultarPorID_Producto", { id1: id, nombre1: "idProducto" });
            const resultConsola = await ApiPublic("ConsultarPorID_Consola", { id1: id, nombre1: "idConsola" });
            const resultMarca = await ApiPublic("ConsultarPorID_AuxMarca", { id1: id, nombre1: "fk_pk_producto" });
            const resultCaracteristicas = await ApiPublic("ConsultarPorID_CaracteristicasConsola", { id1: id, nombre1: "idConsola" });

            //DATOS
            if (resultProducto) {
                setDatosConsola((prev) => ({
                    ...prev,
                    nombreProducto: resultProducto[0].nombreProducto,
                    precioProducto: resultProducto[0].precioProducto,
                    garantiaProducto: resultProducto[0].garantiaProducto,
                    idAdmin: resultProducto[0].idAdministrador_crear,
                    stock: resultProducto[0].stock,
                    cantidad: resultProducto[0].cantidad,
                }));
            }

            if (resultConsola) {
                setDatosConsola((prev) => ({
                    ...prev,
                    sobre: resultConsola[0].sobreConsola
                }));
            }

            if (resultCaracteristicas) {
                setDatosConsola((prev) => ({
                    ...prev,
                    fuentesAlimentacion: resultCaracteristicas[0].fuenteAlimentacion,
                    opcionesConectividad: resultCaracteristicas[0].opcionConectividad,
                    tiposPuertos: resultCaracteristicas[0].tipoPuertos,
                    color: resultCaracteristicas[0].color,
                    tipoControles: resultCaracteristicas[0].tipoControles,
                    controlesIncluidos: resultCaracteristicas[0].controlesIncluidos,
                    controlesSoporta: resultCaracteristicas[0].controlesSoporta,
                    tipoProcesador: resultCaracteristicas[0].tipoProcesador,
                    resolucionImagen: resultCaracteristicas[0].resolucion,
                }));
            }

            if (resultMarca) {
                setDatosConsola((prev) => ({
                    ...prev,
                    marca: resultMarca[0].fk_pk_marca
                }));
            }
        }
    }

    useEffect(() => {
        get();
    }, []);

    useEffect(() => {
        getProducto();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setDatosConsola((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleTipoChange = () => {
        if (id) {
            Navigate(`/Administrador/Agregar_Consola/${id}`)
            Swal.fire({
                icon: "error",
                title: "Acción fallida",
                text: "Para cambiar el tipo del producto debera crear uno nuevo",
            });
            setDatosConsola((prev) => ({
                ...prev,
                idTipoProducto: "Consola",
            }));
        } else {
            Navigate(`/Administrador/Agregar_Juego/`)
        }
    };

    const Validar = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!portada || !visual1 || !visual2 || !visual3) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Debes seleccionar una imagen, Alguna esta vacia."
            });
            return;
        } else if (!DatosConsola.precioProducto || !DatosConsola.nombreProducto ||
            !DatosConsola.cantidad || !DatosConsola.sobre || !DatosConsola.garantiaProducto) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Debes completar todos los campos en la parte de arriba, Alguno esta vacio."
            });
            return;
        } else if (!DatosConsola.fuentesAlimentacion || !DatosConsola.opcionesConectividad ||
            !DatosConsola.tiposPuertos || !DatosConsola.color || !DatosConsola.tipoControles ||
            !DatosConsola.controlesIncluidos || !DatosConsola.controlesSoporta || !DatosConsola.tipoProcesador ||
            !DatosConsola.resolucionImagen) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Debes completar todos los campos en la tabla, Alguno esta vacio."
            });
            return;
        } else if (!DatosConsola.marca || !DatosConsola.idAdmin) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Debes completar las listas de opcion unica, Alguna esta vacia."
            });
            return;
        }
        const formData = new FormData();

        if (portada instanceof File) formData.append("portada", portada);
        if (visual1 instanceof File) formData.append("visual1", visual1);
        if (visual2 instanceof File) formData.append("visual2", visual2);
        if (visual3 instanceof File) formData.append("visual3", visual3);

        Object.entries(DatosConsola).forEach(([key, value]) => {
            formData.append(key, value);
        });


        if (id) {
            formData.append("idProducto", id);
            const response = await ApiPrivate("Editar_Producto", formData)
            if (response) {
                Swal.fire({
                    icon: "success",
                    title: "Acción exitosa",
                    text: "se ha creado un nuevo elemento de distraccion para personas descupadas",
                }).then(() => {
                    Navigate("/Administrador/Productos/");
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Acción Fallida",
                    text: "No se agrego el producto",
                })
            }
        } else {
            const response = await ApiPrivate("Crear_Producto", formData)
            if (response) {
                Swal.fire({
                    icon: "success",
                    title: "Acción exitosa",
                    text: "se ha creado un nuevo elemento de distraccion para personas descupadas",
                }).then(() => {
                    Navigate("/Administrador/Productos/");
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Acción Fallida",
                    text: "No se agrego el producto",
                })
            }
        }
    }

    return (
        <main className="main-content">
            <h2>{id ? "Editar" : "Agregar"} Consola</h2>
            <form onSubmit={Validar} method="post" encType="multipart/form-data">
                <input type="hidden" name="csrf_token" value="" />
                <div className="product-form_Consola">
                    <VerImagenes id={id}
                        setPortada={setPortada}
                        setVisual1={setVisual1}
                        setVisual2={setVisual2}
                        setVisual3={setVisual3}
                        Tipo="Consola" />
                    <div className="product-details">
                        <label htmlFor="product-type">Tipo de producto:</label>
                        <select id="product-type" name="idTipoProducto" value={DatosConsola.idTipoProducto} onChange={handleTipoChange}>
                            <option value="Consola">Consola</option>
                            <option value="Videojuego">Videojuego</option>
                        </select>

                        <label htmlFor="marca">Marca:</label>
                        <select name="marca" value={DatosConsola.marca} onChange={handleChange}>
                            {dataM.map((mar) => (
                                <option key={mar.idMarca} value={mar.idMarca}>
                                    {mar.idMarca}
                                </option>))}
                        </select>

                        <label htmlFor="cantidad">Cantidad:</label>
                        <input type="text" name="cantidad" value={DatosConsola.cantidad} onChange={handleChange} />

                        <label htmlFor="price">Valor:</label>
                        <input type="text" name="precioProducto" value={DatosConsola.precioProducto} onChange={handleChange} />


                        <label htmlFor="name">Nombre Consola:</label>
                        <input type="text" name="nombreProducto" value={DatosConsola.nombreProducto} onChange={handleChange} />
                    </div>
                    <div className="product-details2">
                        <label htmlFor="garantia">Garantia Consola</label>
                        <input type="text" name="garantiaProducto" value={DatosConsola.garantiaProducto} onChange={handleChange} />

                        <label htmlFor="developer">Administardor Encargado:</label>
                        <select name="idAdmin" value={DatosConsola.idAdmin} onChange={handleChange}>
                            {dataA.map((Admin) => (
                                <option key={Admin.idAdministrador} value={Admin.idAdministrador}>
                                    {Admin.idAdministrador} - {Admin.nombreUsuario} {Admin.apellidoUsuario}
                                </option>))}
                        </select>

                        <label htmlFor="estado">Estado Producto:</label>
                        <select name="stock" value={DatosConsola.idAdmin} onChange={handleChange}>
                            <option value={1}>
                                Activo
                            </option>
                            <option value={0}>
                                Inactivo
                            </option>
                        </select>
                    </div>
                </div>
                <h3>Acerca de:</h3>
                <div className="about-section">
                    <div className="container-description">
                        <h5>Sobre el producto:</h5>
                        <textarea name="sobre" value={DatosConsola.sobre} onChange={handleChange} ></textarea>
                    </div>
                </div>

                <h3>Especificaciones tecnicas:</h3>
                <div className="form-container">
                    <div className="section">
                        <h3>Conectividad</h3>
                        <div className="row">
                            <div className="cell">
                                <label htmlFor="ancho">Fuentes de alimentacion</label>
                                <input type="text" name="fuentesAlimentacion" value={DatosConsola.fuentesAlimentacion} onChange={handleChange} />
                            </div>
                            <div className="cell">
                                <label htmlFor="alto">Opciones de conectividad</label>
                                <input type="text" name="opcionesConectividad" value={DatosConsola.opcionesConectividad} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="cell">
                                <label htmlFor="fondo">Tipos de puertos</label>
                                <input type="text" name="tiposPuertos" value={DatosConsola.tiposPuertos} onChange={handleChange} />
                            </div>
                        </div>
                    </div>

                    <div className="section">
                        <h3>Características Físicas</h3>
                        <div className="row">
                            <div className="cell">
                                <label htmlFor="tonalidad">Tonalidad de Color</label>
                                <input type="text" name="color" value={DatosConsola.color} onChange={handleChange} />
                            </div>
                            <div className="cell">
                                <label htmlFor="tipo-controles">Tipo de Controles</label>
                                <input type="text" name="tipoControles" value={DatosConsola.tipoControles} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="cell">
                                <label htmlFor="controles-incluidos">Controles Incluidos</label>
                                <input type="text" name="controlesIncluidos" value={DatosConsola.controlesIncluidos} onChange={handleChange} />
                            </div>
                            <div className="cell">
                                <label htmlFor="controles-soporta">Controles que Soporta</label>
                                <input type="text" name="controlesSoporta" value={DatosConsola.controlesSoporta} onChange={handleChange} />
                            </div>
                        </div>
                    </div>

                    <div className="section">
                        <h3>Características Técnicas</h3>
                        <div className="row">
                            <div className="cell">
                                <label htmlFor="tipo-procesador">Tipo de Procesador</label>
                                <input type="text" name="tipoProcesador" value={DatosConsola.tipoProcesador} onChange={handleChange} />
                            </div>
                            <div className="cell">
                                <label htmlFor="resolucion-imagen">Resolución Imagen</label>
                                <input type="text" name="resolucionImagen" value={DatosConsola.resolucionImagen} onChange={handleChange} />
                            </div>
                        </div>
                    </div>
                </div>
                <section className="ButtonSubmit">
                    <button className="button   ">{id ? "Editar" : "Agregar"} Producto</button>
                </section>
            </form>
        </main>
    )
}
export default AgregarConsolas;  