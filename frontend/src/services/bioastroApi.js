const API_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:3000';

async function post(ruta, datos) {
  let respuesta;

  try {
    respuesta = await fetch(`${API_URL}${ruta}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(datos)
    });
  } catch {
    throw new Error(
      `No se pudo conectar con el servidor BioAstro en ${API_URL}. Verificá que el backend esté encendido (npm run dev).`
    );
  }

  const json = await respuesta.json();

  if (!respuesta.ok) {
    throw new Error(
      json.mensaje ||
      json.error ||
      'No se pudo procesar la solicitud'
    );
  }

  return json;
}

export const bioastroApi = {
  analizarPANAS(respuestas) {
    return post('/api/panas/analizar', {
      respuestas
    });
  },

  analizarSueno(respuestas) {
    return post('/api/sueno/analizar', respuestas);
  }
};
