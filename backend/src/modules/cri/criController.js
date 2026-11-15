
import { calcularCRI } from './criService.js';

export function analizarCRI(req, res) {
  try {
    const resultado = calcularCRI(req.body);

    return res.status(200).json({
      mensaje: 'CRI experimental calculado',
      resultado
    });
  } catch (error) {
    return res.status(400).json({
      mensaje: error.message
    });
  }
}
