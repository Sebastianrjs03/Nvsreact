const Base_Url = import.meta.env.VITE_URL_API

// Declara y exporta la foncion de forma asincrona
export const ApiPublic = async (

  // Recibe el endponint 
  endpoint: string,

  // este es un objeto opcional   
  params?: Record<string, string | number | undefined>
) => {
  try {

    // Crea el objeto URL
    const url = new URL(`${Base_Url}${endpoint}`);

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
    try {
      const isFormData = data instanceof FormData;

      const response = await fetch(`${Base_Url}${endpoint}`, {
        method: 'POST',
        headers: isFormData
          ? undefined // No ponemos headers, el navegador lo hace
          : {
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${token}`,
          },
        body: isFormData ? data : JSON.stringify(data),
      });

      const res = await response.json();

      if (response.ok) {
        return res;
      } else {
        console.log({
          error: true,
          status: response.status,
          mensaje: res?.mensaje ?? "Error en la solicitud.",
        });
        return;
      }
    } catch (error) {
      console.error("Error en ApiPrivate:", error);
      return {
        error: true,
        status: 500,
        mensaje: "Error de red o del servidor.",
      };
    }
  };




