//hooks
import { useState } from "react";

//types
import { EstructuraFiltro } from "../../Types/TypesDatos";

type Props = {
    estructura: EstructuraFiltro,
    setFiltrar: React.Dispatch<React.SetStateAction<EstructuraFiltro | {}>>;
}

const EstiloFiltradoFormFil = (estructura: EstructuraFiltro) => {
    const Columnas = Object.keys(estructura).length;
    const estiloFondo: React.CSSProperties = Columnas == 2
        ? { flexDirection: "row", justifyContent: "center" }
        : Columnas == 3 || Columnas == 4 ? { flexDirection: "row", justifyContent: "center" }
            : { flexDirection: "column", justifyContent: "center" };
    return estiloFondo;
}

const EstiloFiltradoCamposFiltro = (estructura: EstructuraFiltro) => {
    const Columnas = Object.keys(estructura).length;
    const estiloFondo: React.CSSProperties = Columnas == 2
        ? { gridTemplateColumns: "repeat(2, 1fr)" }
        : Columnas == 3 || Columnas == 6 || Columnas == 5 ? { gridTemplateColumns: "repeat(3, 1fr)" }
            : { gridTemplateColumns: "repeat(4, 1fr)" };
    return estiloFondo;
}



const FiltroDinamico: React.FC<Props> = ({ estructura, setFiltrar }) => {
    const [filtrosTemporales, setFiltrosTemporales] = useState<{ [key: string]: any }>({});

    const handleReset = () => {
        setFiltrosTemporales({});
        setFiltrar({});
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | HTMLElement>) => {
        const target = e.target as HTMLInputElement;
        const { name, type, value, checked } = target;
        const nuevoValor = type === "checkbox" ? checked : value;
        setFiltrosTemporales((prev) => ({
            ...prev,
            [name]: nuevoValor
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setFiltrar(filtrosTemporales);
    };

    return (
        <div className="filter_Productos">
            <form onSubmit={handleSubmit} className="FormFil" style={EstiloFiltradoFormFil(estructura)}>
                <section className="CamposFiltro" style={EstiloFiltradoCamposFiltro(estructura)}>
                    {Object.entries(estructura).map(([campo, tipo]) => {
                        if (typeof tipo === "string") {
                            return (
                                <div key={campo} className="DivInput">
                                    <input
                                        type={tipo}
                                        name={campo}
                                        className="inputFil"
                                        placeholder={campo}
                                        value={filtrosTemporales[campo] || ""}
                                        onChange={handleChange}
                                    />
                                </div>
                            );
                        } else if (tipo.tipo === "select") {
                            return (
                                <div key={campo}>
                                    <select className="form-select SelectFiltro" aria-label="Default select example" name={campo} value={filtrosTemporales[campo] || ""} onChange={handleChange}>
                                        <option value="">Seleccionar {campo}</option>
                                        {tipo.opciones.map((opcion) => (
                                            <option key={opcion} value={opcion}>
                                                {opcion}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            );
                        }
                        return null;
                    })}
                </section>
                <section className="SectionFiltrar">

                    <button type="submit" className="BotonSubmit">
                        <i className="fa-solid fa-sliders"></i>  Filtrar</button>
                    <button type="button" className="BotonReset" onClick={handleReset}>
                        <i className="fa-solid fa-xmark"></i>  Limpiar</button>
                </section>
            </form>
        </div>
    );
}

export default FiltroDinamico;