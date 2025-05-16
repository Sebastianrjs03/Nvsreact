const Base_Url = import.meta.env.VITE_URL_API

// Declara y exporta la foncion de forma asincronica

export const ApiPublic = async (

// Recibe el endponint 
  endpoint: string,

// este es un objeto opcional   
  params?: Record<string, string | number>
) => {
  try {

// Crea el objeto URL
    let url = new URL(`${Base_Url}${endpoint}`);

// Verifica si params fue enviado    
    if (params) {

      // Array de pares con su clave y valor  { clave: 1, valor: "uno" }
      Object.entries(params).forEach(([key, value]) => {  // se recorre cada par con forEach

        // Agrega el param como parametro de consulta
        url.searchParams.append(key, String(value));
      });
    }

    // convierte a string usa await para esperar la respuesta
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      return await response.json();
    } else {
      console.error(`Error HTTP: ${response.status}`);
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



