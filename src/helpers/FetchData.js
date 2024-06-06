const FetchData = async (
  endpoint,
  { method = "GET", headers = {}, body = null } = {}
) => {
  try {
    const options = {
      method,
      headers,
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(endpoint, options);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    
    const responseBody = await response.text();

    // Verificar si la respuesta está vacía
    if (!responseBody.trim()) {
      return null; // Devolver null si la respuesta está vacía
    }

    // Analizar el cuerpo de la respuesta como JSON
    const data = JSON.parse(responseBody);
    return data;
  } catch (error) {
    console.log(error);
    throw error; // Re-throw the error for further handling if needed
  }
};

export default FetchData;
