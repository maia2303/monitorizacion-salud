
import { calcularPuntajeSueno } from './suenoService.js';

export function analizarSueno(req, res) {
  try {
    const resultado = calcularPuntajeSueno(req.body);

    return res.status(200).json({
      mensaje: 'Test de sueño analizado correctamente',
      resultado
    });

  } catch (error) {
    return res.status(400).json({
      mensaje: error.message
    });
  }
}
