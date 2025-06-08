//hooks
import { useState, useEffect } from "react";
import { ApiPublic } from "../../../../hooks/UseFetch";

interface ModalProps {
    id: string | undefined;
    setPortada: React.Dispatch<React.SetStateAction<File | string>>;
    setVisual1: React.Dispatch<React.SetStateAction<File | string>>;
    setVisual2: React.Dispatch<React.SetStateAction<File | string>>;
    setVisual3: React.Dispatch<React.SetStateAction<File | string>>;
    Tipo: string;
    setBanner?: React.Dispatch<React.SetStateAction<File | string>>;
    setTrailer?: React.Dispatch<React.SetStateAction<File | string>>;
}

const VerImagenes = ({ id, setPortada, setVisual1, setVisual2, setVisual3, setTrailer, setBanner, Tipo }: ModalProps) => {

    const ArrayInicial = [
        "",
        "",
        "",
    ] 

    const [URLPortada, setURLPortada] = useState<string>("");
    const [URLBanner, setURLBanner] = useState<string>("");
    const [URLSVisuales, setURLSVisuales] = useState<string[]>(ArrayInicial);
    const [URLTrailer, setURLTrailer] = useState<string>("");

    const getProducto = async () => {
        if (id) {

            let resultPortada;
            let resultTrailer;
            let resultVisuales;
            let resultBanner;

            if(Tipo === "Juego"){
                resultPortada = await ApiPublic("ConsultarPorId_Imagenes", { id: id, categoria: "portada", carpeta: "Videojuego" });
                resultTrailer = await ApiPublic("ConsultarPorId_Imagenes", { id: id, categoria: "trailer", carpeta: "Videojuego" });
                resultVisuales = await ApiPublic("ConsultarPorId_Imagenes", { id: id, categoria: "visuales", carpeta: "Videojuego" });
                resultBanner = await ApiPublic("ConsultarPorId_Imagenes", { id: id, categoria: "banner", carpeta: "Videojuego" });
            }else {
                resultVisuales = await ApiPublic("ConsultarPorId_Imagenes", { id: id, categoria: "visuales", carpeta: "Consola" });
                resultPortada = await ApiPublic("ConsultarPorId_Imagenes", { id: id, categoria: "portada", carpeta: "Consola" });
            }

            if (resultBanner) {
                const keys = Object.keys(resultBanner);
                if (keys.length > 0) {
                    const url = resultBanner[keys[0]];
                    setURLBanner(url);
                    if (setBanner) {
                        setBanner("No");
                    }
                }
            }

            if (resultTrailer) {
                const keys = Object.keys(resultTrailer);
                if (keys.length > 0) {
                    const url = resultTrailer[keys[0]];
                    setURLTrailer(url);
                    if (setTrailer) {
                        setTrailer("No");
                    }
                }
            }

            if (resultVisuales) {
                if (resultVisuales) {
                    const urls: string[] = Object.values(resultVisuales);
                    setURLSVisuales(urls);
                    setVisual1("No");
                    setVisual2("No");
                    setVisual3("No");
                }
            }

            if (resultPortada) {
                const keys = Object.keys(resultPortada);
                if (keys.length > 0) {
                    const url = resultPortada[keys[0]];
                    setURLPortada(url);
                    setPortada("No");
                }
            }

        }
    }

    useEffect(() => {
        getProducto();
    }, [id]);

    const handlePortadaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            if (file) {
                const urlTemporal = URL.createObjectURL(file);
                setURLPortada(urlTemporal);
            }
            if (setPortada) {
                setPortada(file);
            }
        }
    };

    const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            if (file) {
                const urlTemporal = URL.createObjectURL(file);
                setURLBanner(urlTemporal);
            }
            if (setBanner) {
                setBanner(file);
            }
        }
    };


    const handleTrailerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            if (file) {
                const urlTemporal = URL.createObjectURL(file);
                setURLTrailer(urlTemporal);
            }
            if (setTrailer) {
                setTrailer(file);
            }
        }
    };

    const handleVisualesChange = (e: React.ChangeEvent<HTMLInputElement>, indice: number
    ) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const urlTemporal = URL.createObjectURL(file);

        // Actualiza el array de URLs
        setURLSVisuales((prev) => {
            const nuevasURLs = [...prev];
            nuevasURLs[indice] = urlTemporal;
            return nuevasURLs;
        });

        switch (indice) {
            case 0:
                setVisual1(file);
                break;
            case 1:
                setVisual2(file);
                break;
            case 2:
                setVisual3(file);
                break;
            default:
                break;
        }
    };

    const EstiloImagenes = (Url: string) => {
            const estiloFondo: React.CSSProperties = Url
                ? { backgroundImage: `url(${Url})` }
                : { backgroundColor: '#6411b3' };
            return estiloFondo;
    }

    return (
        <div className={Tipo === "Juego" ? "visuals" : "visuals_Consola"}>
            <div className="image-placeholder-left" style={{ height: "400px" }}>
                {Tipo === "Juego" &&
                    <div className="img-left" style={EstiloImagenes(URLBanner)}>
                        <label htmlFor="name">banner:</label>
                        <input className="file-input" type="file" onChange={handleBannerChange}
                            style={{ width: "130px" }} />
                    </div>}
                {URLSVisuales.map((url,index) => (
                    <div className="img-left" style={EstiloImagenes(url)}>
                    {Tipo === "Juego" ? <label htmlFor="name">Visual {index + 1}:</label> : <label htmlFor="name">Auxiliar {index + 1}:</label>}
                    <input className="file-input" type="file" onChange={(e) => handleVisualesChange(e, index)}
                        style={{ width: "130px" }} />
                </div>
                ))}
                {Tipo === "Juego" &&
                    <div className="img-left" style={EstiloImagenes(URLTrailer)}>
                        <label htmlFor="name">trailer:</label>
                        <input className="file-input" type="file" onChange={handleTrailerChange}
                            style={{ width: "130px" }} />
                    </div>}
            </div>
            <div className={Tipo === "Juego"? "image-placeholder" : "image-placeholder_Consola"} style={EstiloImagenes(URLPortada)}>
                <label htmlFor="name">portada:</label>
                <input className="file-input" type="file" onChange={handlePortadaChange}
                    style={{ width: "130px" }} />
            </div>
        </div>
    )
}
export default VerImagenes;
