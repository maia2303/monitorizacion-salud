
import { calcularPANAS } from './panasService.js';

// Recibe las respuestas del frontend
export function analizarPANAS(req, res) {
  try {
    const { respuestas } = req.body;

    // El Service valida y calcula los resultados
    const resultado = calcularPANAS(respuestas);

    // Devolvemos el resultado al frontend
    res.status(200).json({
      mensaje: 'PANAS calculado correctamente',
      resultado
    });

  } catch (error) {
    res.status(400).json({
      mensaje: error.message
    });
  }
}
