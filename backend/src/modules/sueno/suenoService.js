
const LATENCIAS = [
  'MENOS_15',
  '15_30',
  '30_60',
  'MAS_60'
];

const CALIDADES_DESPERTAR = [
  'BIEN',
  'REGULAR',
  'CANSADO'
];

const MOTIVOS_INTERRUPCION = [
  'RUIDO',
  'TEMPERATURA',
  'MENTE_ACTIVA',
  'OTRO'
];

const CAPACIDADES_ROVER = [
  'OPTIMA',
  'ESTANDAR',
  'COPILOTO'
];

export function validarSueno(datos) {

  // Verificar que recibimos un objeto
  if (!datos || typeof datos !== 'object' ||
      Array.isArray(datos)) {
    throw new Error('Los datos de sueño son inválidos');
  }

  const {
    latenciaSueno,
    cantidadDespertares,
    despiertoMas30Min,
    calidadDespertar,
    interrupciones,
    capacidadRover
  } = datos;

  // 1. Validar tiempo para quedarse dormido
  if (!LATENCIAS.includes(latenciaSueno)) {
    throw new Error('Latencia de sueño inválida');
  }

  // 2. Validar cantidad de despertares
  if (!Number.isInteger(cantidadDespertares) ||
      cantidadDespertares < 0 ||
      cantidadDespertares > 30) {
    throw new Error('Cantidad de despertares inválida');
  }

  // 3. Validar despertar prolongado
  if (typeof despiertoMas30Min !== 'boolean') {
    throw new Error('Despertar prolongado inválido');
  }

  // 4. Validar calidad al despertar
  if (!CALIDADES_DESPERTAR.includes(calidadDespertar)) {
    throw new Error('Calidad del despertar inválida');
  }

  // 5. Validar las interrupciones
  if (!Array.isArray(interrupciones)) {
    throw new Error('Interrupciones debe ser un arreglo');
  }

  for (const motivo of interrupciones) {
    if (!MOTIVOS_INTERRUPCION.includes(motivo)) {
      throw new Error('Motivo de interrupción inválido');
    }
  }

  // No permitir motivos repetidos
  if (new Set(interrupciones).size !== interrupciones.length) {
    throw new Error('Hay interrupciones repetidas');
  }

  // 6. Validar capacidad autopercibida para el rover
  if (!CAPACIDADES_ROVER.includes(capacidadRover)) {
    throw new Error('Capacidad para el rover inválida');
  }

  return {
    latenciaSueno,
    cantidadDespertares,
    despiertoMas30Min,
    calidadDespertar,
    interrupciones,
    capacidadRover
  };
}

const PENALIZACION_LATENCIA = {
  MENOS_15: 0,
  '15_30': 5,
  '30_60': 15,
  MAS_60: 25
};

const PENALIZACION_DESPERTAR = {
  BIEN: 0,
  REGULAR: 12,
  CANSADO: 25
};

const PENALIZACION_INTERRUPCION = {
  RUIDO: 3,
  TEMPERATURA: 3,
  MENTE_ACTIVA: 5,
  OTRO: 2
};

export function calcularPuntajeSueno(datos) {
  const respuestas = validarSueno(datos);

  const {
    latenciaSueno,
    cantidadDespertares,
    despiertoMas30Min,
    calidadDespertar,
    interrupciones,
    capacidadRover
  } = respuestas;

  const latencia = PENALIZACION_LATENCIA[latenciaSueno];

  const despertares = Math.min(
    cantidadDespertares * 6,
    25
  );

  const despertarProlongado =
    despiertoMas30Min ? 15 : 0;

  const calidad =
    PENALIZACION_DESPERTAR[calidadDespertar];

  const causas = Math.min(
    interrupciones.reduce(
      (total, causa) =>
        total + PENALIZACION_INTERRUPCION[causa],
      0
    ),
    10
  );

  const totalPenalizaciones =
    latencia +
    despertares +
    despertarProlongado +
    calidad +
    causas;

  const puntajeSueno = Math.max(
    0,
    Math.min(100, 100 - totalPenalizaciones)
  );

  const nivelDescanso =
    puntajeSueno >= 80 ? 'ALTO' :
    puntajeSueno >= 60 ? 'MODERADO' : 'BAJO';

  return {
    ...respuestas,
    puntajeSueno,
    nivelDescanso,
    discordanciaSubjetiva:
      puntajeSueno < 60 &&
      capacidadRover === 'OPTIMA',
    desglosePenalizaciones: {
      latencia,
      despertares,
      despertarProlongado,
      calidad,
      interrupciones: causas
    },
    tipoIndice: 'EXPERIMENTAL_BIOASTRO'
  };
}

