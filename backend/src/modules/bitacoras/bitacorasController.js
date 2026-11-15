
import { validarBitacora } from './bitacorasService.js';

// Recibir y validar una bitácora
export function crearBitacora(req, res) {
  try {
    // Obtener los datos enviados desde React
    const datos = req.body;

    // Validar el contenido, la fase y el consentimiento
    const bitacora = validarBitacora(datos);

    // Devolver los datos validados
    res.status(200).json({
      mensaje: 'Bitácora validada correctamente',
      resultado: bitacora
    });

  } catch (error) {
    res.status(400).json({
      mensaje: error.message
    });
  }
}
