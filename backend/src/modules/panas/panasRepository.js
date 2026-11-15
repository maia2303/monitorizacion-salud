
import db from '../../config/db.js';

// Guardar una evaluación PANAS completa
export async function guardarPANAS({
  idAstronauta,
  idOperacion = null,
  fase,
  respuestas
}) {

  // Utilizamos una conexión para la transacción
  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    // 1. Crear registro en historial_test
    const [historial] = await connection.execute(
      `INSERT INTO historial_test
       (id_astronauta, id_operacion, tipo_test,
        fase, estado, origen_datos)
       VALUES (?, ?, 'PANAS', ?, 'COMPLETO', 'MANUAL')`,
      [idAstronauta, idOperacion, fase]
    );

    const idHistorial = historial.insertId;

    // 2. Crear evaluación PANAS
    const [evaluacion] = await connection.execute(
      `INSERT INTO evaluaciones_panas (id_historial)
       VALUES (?)`,
      [idHistorial]
    );

    const idEvaluacion = evaluacion.insertId;

    // 3. Obtener las preguntas de la base
    const [preguntas] = await connection.execute(
      `SELECT id_pregunta, numero_pregunta
       FROM preguntas_panas
       WHERE version_test = 'PANAS'
       ORDER BY numero_pregunta`
    );

    if (
      preguntas.length !== 20 ||
      preguntas.some((p, i) => p.numero_pregunta !== i + 1)
    ) {
      throw new Error(
        'Las 20 preguntas PANAS no están configuradas correctamente'
      );
    }

    // 4. Guardar cada respuesta
    for (const pregunta of preguntas) {
      const valor = respuestas[pregunta.numero_pregunta - 1];

      await connection.execute(
        `INSERT INTO respuestas_panas
         (id_evaluacion, id_pregunta, valor)
         VALUES (?, ?, ?)`,
        [idEvaluacion, pregunta.id_pregunta, valor]
      );
    }

    // 5. Confirmar todos los cambios
    await connection.commit();

    return {
      idHistorial,
      idEvaluacion
    };

  } catch (error) {

    // Si falla algo, deshacer todos los INSERT
    await connection.rollback();
    throw error;

  } finally {

    // Devolver la conexión al pool
    connection.release();
  }
}
