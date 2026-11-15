
const ITEMS_PA = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
const ITEMS_NA = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20];

export function calcularPANAS(respuestas) {
  if (!Array.isArray(respuestas) || respuestas.length !== 20) {
    throw new Error('PANAS requiere exactamente 20 respuestas');
  }

  if (!respuestas.every(
    valor => Number.isInteger(valor) && valor >= 1 && valor <= 5
  )) {
    throw new Error('Las respuestas deben ser enteros entre 1 y 5');
  }

  const sumar = items =>
    items.reduce(
      (total, numero) => total + respuestas[numero - 1],
      0
    );

  const pa = sumar(ITEMS_PA);
  const na = sumar(ITEMS_NA);

  const paNormalizado = (pa - 10) / 40;
  const naNormalizado = (na - 10) / 40;

  return {
    pa,
    na,
    paNormalizado,
    naNormalizado
  };
}
