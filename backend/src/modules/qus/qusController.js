import { procesarQUS } from './qusService.js';
import { guardarResultadoQUS } from './qusRepository.js';

/**
 * Recibe el JSON de telemetría QUS, realiza los cálculos de salud ósea
 * e intenta persistirlo en la base de datos MySQL.
 */
export async function sincronizarQUS(req, res) {
  try {
    const datosQUS = req.body;

    // 1. El servicio valida las métricas y realiza los cálculos biomédicos
    const resultadoCalculos = procesarQUS(datosQUS);

    // 2. Intento de persistencia en MySQL
    const persistencia = await guardarResultadoQUS(resultadoCalculos);

    // 3. Responder al frontend con los cálculos y el estado
    res.status(200).json({
      mensaje: 'Telemetría de ultrasonido QUS sincronizada y calculada correctamente',
      resultado: {
        ...resultadoCalculos,
        persistencia
      }
    });
  } catch (error) {
    res.status(400).json({
      mensaje: error.message || 'Error al procesar la telemetría QUS'
    });
  }
}

/**
 * Devuelve el JSON de simulacro oficial
 */
export function obtenerSimulacionQUS(req, res) {
  res.status(200).json({
    astronaut_id: 'AST-01',
    astronaut_name: 'Cmdte. Alex Vega',
    mission_day: 42,
    device_id: 'QUS-ROVER-04',
    timestamp: '2026-11-15T14:30:00Z',
    metrics: {
      sos_ms: 1518,
      bua_db_mhz: 71.5,
      calcium_urine_mg_dl: 24.5,
      ctx_ug_mmol: 465
    }
  });
}
