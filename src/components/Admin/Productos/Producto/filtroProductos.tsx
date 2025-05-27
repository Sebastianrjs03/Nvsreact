import { useState } from "react";

type CampoTipo = "text" | "number" | "email" | "date";

type CampoSelect = {
  tipo: "select";
  opciones: string[];
};

export type EstructuraFiltro = {
    [key: string]: CampoTipo | CampoSelect;
};


type Props = {
    estructura: EstructuraFiltro,
    setFiltrar: React.Dispatch<React.SetStateAction<EstructuraFiltro | {}>>;
    setTipoTabla: React.Dispatch<React.SetStateAction<string>>;
    tipoTabla: string;
}

const tiposTabla = [
    { tipo: "Productos" }, { tipo: "Videojuegos" }, { tipo: "Consolas" }
];

const FiltroDinamico: React.FC<Props> = ({ estructura, setFiltrar, setTipoTabla, tipoTabla }) => {
    const [filtrosTemporales, setFiltrosTemporales] = useState<{ [key: string]: any }>({});

    const handleTipoTablaChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLSelectElement>) => {
        setTipoTabla(e.target.value);
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
        <div className="filter">
            <select className="form-select" aria-label="Default select example" style={{ backgroundColor: "lightgray", alignItems: "center", marginBottom: "10px" }} value={tipoTabla ?? ''} onChange={handleTipoTablaChange}>
                <option value={tipoTabla}>{tipoTabla}</option>
                {tipoTabla
                    && tiposTabla
                        .filter((Ti) => Ti.tipo !== tipoTabla)
                        .map((Ti) => (
                            <option key={Ti.tipo} value={Ti.tipo}>
                                {Ti.tipo}
                            </option>
                        ))
                }
            </select>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {Object.entries(estructura).map(([campo, tipo]) => {
                    if (typeof tipo === "string") {
                        return (
                            <div key={campo}>
                                <label>{campo}</label>
                                <input
                                    type={tipo}
                                    name={campo}
                                    value={filtrosTemporales[campo] || ""}
                                    onChange={handleChange}
                                />
                            </div>
                        );
                    } else if (tipo.tipo === "select") {
                        return (
                            <div key={campo}>
                                <label>{campo}</label>
                                <select name={campo} value={filtrosTemporales[campo] || ""} onChange={handleChange}>
                                    <option value="">-- Seleccionar --</option>
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

                <button type="submit">Filtrar</button>
            </form>
        </div>
    );
}

export default FiltroDinamico;