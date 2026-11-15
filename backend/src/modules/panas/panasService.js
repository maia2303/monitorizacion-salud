
const ITEMS_PA = [1, 3, 5, 9, 10, 12, 14, 16, 17, 19];
const ITEMS_NA = [2, 4, 6, 7, 8, 11, 13, 15, 18, 20];

export function calcularPANAS(respuestas) {

  // Verificar que recibimos 20 respuestas
  if (!Array.isArray(respuestas) || respuestas.length !== 20) {
    throw new Error("PANAS requiere exactamente 20 respuestas");
  }

  // Cada respuesta debe ser un número entero entre 1 y 5
  for (const valor of respuestas) {
    if (!Number.isInteger(valor) || valor < 1 || valor > 5) {
      throw new Error("Las respuestas deben estar entre 1 y 5");
    }
  }

  // Sumar los valores de una dimensión
  const sumar = (items) => {
    return items.reduce((total, numero) => {
      return total + respuestas[numero - 1];
    }, 0);
  };

  const pa = sumar(ITEMS_PA);
  const na = sumar(ITEMS_NA);

  // Normalización del rango 10-50 al rango 0-1
  const paNormalizado = (pa - 10) / 40;
  const naNormalizado = (na - 10) / 40;

  return {
    pa,
    na,
    paNormalizado,
    naNormalizado
  };
}
