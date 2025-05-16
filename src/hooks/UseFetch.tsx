//librerias
import Swal from "sweetalert2";

const Base_Url = import.meta.env.VITE_URL_API

export const ApiPublic = async (endpoint: string, id1?: string | number,nombre1?: string, id2?: string | number,
     nombre2?: string) => {

    try {

        let url = `${Base_Url}${endpoint}`;

        if (id1 && id2 && nombre1 && nombre2) {
            let nombre1s = nombre1.replace(/['"]/g, '');
            let nombre2s = nombre2.replace(/['"]/g, '');
            url += `&id1=${id1}&id2=${id2}&nombre1=${nombre1s}&nombre2=${nombre2s}`;
        }
        else if (id1 && nombre1) {
            let nombre1s = nombre1.replace(/['"]/g, '');
            url += `&id1=${id1}&nombre1=${nombre1s}`;
        }
        console.log(url)
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 200 || response.status === 201) {
            return await response.json();
        }
    } catch (error) {
        console.error("Error en ApiPublic:", error);
    }
};

export const ApiPrivate = async (endpoint: string, data: []) => {
    //const token = sessionStorage.getItem("token");
    try {
        const response = await fetch(`${Base_Url}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                //'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            return await response.json();
        } else if (response.status == 409) {
            await Swal.fire({
                icon: "error",
                title: "Acción fallida",
                text: "Identificador duplicado",
            });
            return null;
        } else {
            await Swal.fire({
                icon: "error",
                title: "Acción fallida",
                text: "Error conexion",
            });
            console.error(`Error HTTP: ${response.status}`);
        }
    } catch (error) {
        console.error("Error en ApiPrivate:", error);
    }
};



