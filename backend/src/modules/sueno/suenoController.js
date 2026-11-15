
import { validarSueno } from './suenoService.js';

// Recibir y validar los datos de sueño
export function analizarSueno(req, res) {
  try {
    // Obtener los datos enviados desde React
    const datos = req.body;

    // El Service realiza las validaciones
    const resultado = validarSueno(datos);

    // Si todo está correcto, responder HTTP 200
    res.status(200).json({
      mensaje: 'Datos de sueño validados correctamente',
      resultado
    });

  } catch (error) {
    // Si alguna respuesta es inválida, responder HTTP 400
    res.status(400).json({
      mensaje: error.message
    });
  }
}
