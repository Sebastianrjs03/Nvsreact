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
}

const FiltroDinamico: React.FC<Props> = ({ estructura, setFiltrar }) => {
    const [filtrosTemporales, setFiltrosTemporales] = useState<{ [key: string]: any }>({});

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
                <form onSubmit={handleSubmit} className="FormFil">
                    <section className="CamposFiltro">
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
                     <button type="submit" className="BotonSubmit">Filtrar</button>
                    </section>
                </form>
        </div>
    );
}

export default FiltroDinamico;