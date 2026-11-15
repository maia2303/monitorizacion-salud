const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

/**
 * Cliente HTTP para consumir los endpoints de BioAstro Backend
 */
async function post(ruta, datos) {
  const respuesta = await fetch(`${API_URL}${ruta}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(datos),
  });

  const json = await respuesta.json();

  if (!respuesta.ok) {
    throw new Error(
      json.mensaje || json.error || 'No se pudo procesar la solicitud en el servidor'
    );
  }

  return json;
}

export const bioastroApi = {
  /**
   * Envía el JSON de telemetría de Ultrasonido QUS al backend para
   * que realice las cuentas clínicas (Stiffness Index, T-Score, Resorción)
   * y guarde el registro en MySQL.
   */
  async sincronizarQUS(datosQUS) {
    return post('/api/qus/sincronizar', datosQUS);
  },

  /**
   * Obtiene la plantilla oficial del JSON de simulacro QUS
   */
  async obtenerPlantillaQUS() {
    const respuesta = await fetch(`${API_URL}/api/qus/simulacion`);
    if (!respuesta.ok) throw new Error('No se pudo obtener la simulación');
    return respuesta.json();
  },

  /**
   * Envía las 20 respuestas de afecto emocional (PANAS)
   */
  async analizarPANAS(respuestas) {
    return post('/api/panas/analizar', { respuestas });
  },

  /**
   * Envía los datos de descanso y sueño pre-rover
   */
  async analizarSueno(datosSueno) {
    return post('/api/sueno/analizar', datosSueno);
  },
};

export default bioastroApi;

