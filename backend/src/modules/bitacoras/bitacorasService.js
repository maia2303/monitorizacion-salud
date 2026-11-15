
export function validarBitacora(datos) {

  if (!datos || typeof datos !== 'object' ||
      Array.isArray(datos)) {
    throw new Error('Los datos de la bitácora son inválidos');
  }

  const {
    contenido,
    fase,
    autorizaAnalisis
  } = datos;

  // Validar el texto
  if (typeof contenido !== 'string' ||
      contenido.trim().length < 10 ||
      contenido.length > 4000) {
    throw new Error(
      'La bitácora debe contener entre 10 y 4000 caracteres'
    );
  }

  // Validar el momento de la misión
  const FASES = [
    'DIA_1',
    'PRE_ROVER',
    'POST_ROVER',
    'SEGUIMIENTO'
  ];

  if (!FASES.includes(fase)) {
    throw new Error('Fase de misión inválida');
  }

  // Consentimiento para el análisis con IA
  if (typeof autorizaAnalisis !== 'boolean') {
    throw new Error('Consentimiento inválido');
  }

  return {
    contenido: contenido.trim(),
    fase,
    autorizaAnalisis
  };
}
