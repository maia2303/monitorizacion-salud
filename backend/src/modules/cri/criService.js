
const clip = (valor, min = 0, max = 1) =>
  Math.max(min, Math.min(max, valor));

function validarNumero(nombre, valor, min, max) {
  if (
    typeof valor !== 'number' ||
    !Number.isFinite(valor) ||
    valor < min ||
    valor > max
  ) {
    throw new Error(`${nombre} debe estar entre ${min} y ${max}`);
  }
}

// Modelo experimental BioAstro.
// No es un índice clínico ni de autorización operativa.
export function calcularCRI({
  puntajeSueno,
  panas,
  lineaBase,
  pvt
}) {
  validarNumero('puntajeSueno', puntajeSueno, 0, 100);

  if (!panas || !lineaBase || !pvt) {
    throw new Error(
      'Se requieren PANAS, línea base y resultados PVT'
    );
  }

  const pa = panas.paNormalizado;
  const na = panas.naNormalizado;
  const paBase = lineaBase.paNormalizado;
  const naBase = lineaBase.naNormalizado;

  validarNumero('PA actual', pa, 0, 1);
  validarNumero('NA actual', na, 0, 1);
  validarNumero('PA base', paBase, 0, 1);
  validarNumero('NA base', naBase, 0, 1);

  const lapses = pvt.lapses;
  const falseStarts = pvt.falseStarts;

  if (
    !Number.isInteger(lapses) ||
    lapses < 0 ||
    !Number.isInteger(falseStarts) ||
    falseStarts < 0
  ) {
    throw new Error(
      'Se requieren lapses y falseStarts válidos del PVT'
    );
  }

  // Atención: 40 %
  const penalizacionPVT = clip(
    0.7 * (lapses / 5) +
    0.3 * (falseStarts / 3)
  );

  // Afecto: 35 %
  // En PANAS-20, 8 puntos equivalen a 0.20
  // y 7 puntos equivalen a 0.175.
  const deltaPA = paBase - pa;
  const deltaNA = na - naBase;

  const penalizacionAnimo = clip(
    Math.max(
      deltaPA / 0.20,
      deltaNA / 0.175,
      0
    )
  );

  // Descanso: 25 %
  const penalizacionSueno =
    clip((100 - puntajeSueno) / 100);

  const criLineal = clip(
    100 -
    40 * penalizacionPVT -
    35 * penalizacionAnimo -
    25 * penalizacionSueno,
    0,
    100
  );

  // Techo preventivo simulado.
  const vetoSimulado =
    lapses >= 5 ||
    falseStarts >= 3 ||
    deltaNA >= 0.175;

  const criFinal = vetoSimulado
    ? Math.min(criLineal, 55)
    : criLineal;

  return {
    cri: Number(criFinal.toFixed(2)),
    vetoSimulado,
    penalizaciones: {
      pvt: Number(penalizacionPVT.toFixed(3)),
      animo: Number(penalizacionAnimo.toFixed(3)),
      sueno: Number(penalizacionSueno.toFixed(3))
    },
    tipoIndice: 'EXPERIMENTAL_BIOASTRO'
  };
}
