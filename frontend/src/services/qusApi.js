import bioastroApi from './bioastroApi';
import simulacionQUSLocal from '../data/simulacionQUS.json';

/**
 * Servicio frontend especializado para el simulacro de telemetría QUS.
 */
export const qusApi = {
  /**
   * Obtiene el JSON local de simulación cargado en el frontend
   */
  obtenerDatosSimulacion() {
    return simulacionQUSLocal;
  },

  /**
   * Envía el JSON de telemetría al endpoint backend /api/qus/sincronizar
   */
  async sincronizar(datos = simulacionQUSLocal) {
    try {
      return await bioastroApi.sincronizarQUS(datos);
    } catch (error) {
      console.warn('Conexión backend no disponible, procesando simulación localmente:', error.message);
      // Cálculo de respaldo idéntico al backend en caso de desconexión del servidor
      const sos = datos.metrics.sos_ms;
      const bua = datos.metrics.bua_db_mhz;
      const si = Number(((0.67 * bua) + (0.28 * sos) - 420).toFixed(2));
      const tScore = Number(((si - 100) / 15).toFixed(2));
      const zScore = Number(((si - 90) / 14).toFixed(2));

      return {
        mensaje: 'Telemetría calculada (Modo Rover Autónomo Offline)',
        resultado: {
          ...datos,
          metricas_originales: datos.metrics,
          calculos: {
            stiffness_index: si,
            t_score: tScore,
            z_score: zScore,
            clasificacion: 'Pérdida Trabecular Marcada (Osteopenia Acelerada 1/6 G)',
            nivel_resorcion: `Acelerada (${datos.metrics.ctx_ug_mmol} µg/mmol · +55% sobre línea basal)`,
            alerta_resorcion: true,
            estado_calciuria: `Elevada (${datos.metrics.calcium_urine_mg_dl} mg/dL) · Riesgo de microcristales renales`,
            alerta_calciuria: true,
            recomendaciones: [
              'Carga Mecánica: 30 min de ejercicio con bandas elásticas y arnés reactivo en rover.',
              'Nefroprotección: Ingerir 350 ml de agua en los próximos 45 min para diluir el calcio libre.',
              'Seguimiento acústico: Repetir escaneo QUS en Sol 45 (en 3 días).'
            ]
          },
          persistencia: {
            guardado: false,
            aviso: 'Servidor backend local no detectado en puerto 3000'
          }
        }
      };
    }
  }
};

export default qusApi;

