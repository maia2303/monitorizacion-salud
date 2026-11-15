import db from '../../config/db.js';

/**
 * Repositorio para persistir la evaluación de ultrasonido QUS en MySQL
 */
export async function guardarResultadoQUS(datosQUS) {
  try {
    // Intentar registrar en base de datos si la conexión está disponible
    const connection = await db.getConnection();
    
    try {
      await connection.beginTransaction();

      // Guardar en tabla resultados_qus si existe
      const [resultado] = await connection.execute(
        `INSERT INTO resultados_qus 
         (astronaut_id, mission_day, device_id, sos_ms, bua_db_mhz, stiffness_index, t_score, calcium_urine, ctx_marker)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          datosQUS.astronaut_id,
          datosQUS.mission_day,
          datosQUS.device_id,
          datosQUS.metricas_originales.sos_ms,
          datosQUS.metricas_originales.bua_db_mhz,
          datosQUS.calculos.stiffness_index,
          datosQUS.calculos.t_score,
          datosQUS.metricas_originales.calcium_urine_mg_dl,
          datosQUS.metricas_originales.ctx_ug_mmol
        ]
      );

      await connection.commit();
      return {
        guardado: true,
        id_insercion: resultado.insertId
      };
    } catch (dbError) {
      await connection.rollback();
      // Si la tabla no existe o las columnas difieren, registramos aviso sin romper la API
      console.warn('Aviso DB QUS (guardado omitido por esquema):', dbError.message);
      return {
        guardado: false,
        aviso: dbError.message
      };
    } finally {
      connection.release();
    }
  } catch (conexionError) {
    console.warn('Aviso DB QUS (sin conexión a MySQL activa):', conexionError.message);
    return {
      guardado: false,
      aviso: 'Conexión a MySQL en espera o no disponible en este entorno'
    };
  }
}

