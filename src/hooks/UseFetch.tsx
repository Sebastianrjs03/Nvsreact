const Base_Url = import.meta.env.VITE_URL_API

export const ApiPublic = async (endpoint: string, id1?: string | number, id2?: string | number,
    nombre1?: string, nombre2?: string) => {

    try {

        let url = `${Base_Url}${endpoint}`;

        if (id1 && id2 && nombre1 && nombre2) {
            url += `&id1=${id1}&id2=${id2}&nombre1=${nombre1}&nombre2=${nombre2}`;
        }
        else if (id1 && nombre1) {
            url += `&id1=${id1}&nombre1=${nombre1}`;
        } else if (id2 && nombre2) {
            url += `&id2=${id2}&nombre2=${nombre2}`;
        }

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

export const ApiPrivate = async (endpoint: string, data: any) => {
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
        } else {
            console.error(`Error HTTP: ${response.status}`);
        }
    } catch (error) {
        console.error("Error en ApiPrivate:", error);
    }
};



