/**
 * Servicio de procesamiento y análisis clínico de Ultrasonometría Ósea (QUS)
 * Calcula Índice de Rigidez (Stiffness Index), T-Score y evaluación de resorción en 1/6 G.
 */

export function procesarQUS(datos) {
  if (!datos || typeof datos !== 'object') {
    throw new Error('Los datos del test QUS son inválidos o están vacíos');
  }

  const {
    astronaut_id,
    astronaut_name,
    mission_day,
    device_id,
    timestamp,
    metrics
  } = datos;

  if (!astronaut_id || !astronaut_name) {
    throw new Error('Falta identificación del astronauta (astronaut_id, astronaut_name)');
  }

  if (!metrics || typeof metrics !== 'object') {
    throw new Error('Faltan las métricas de ultrasonido (metrics)');
  }

  const { sos_ms, bua_db_mhz, calcium_urine_mg_dl, ctx_ug_mmol } = metrics;

  if (typeof sos_ms !== 'number' || sos_ms < 1400 || sos_ms > 1700) {
    throw new Error('Velocidad del sonido (sos_ms) fuera de rango biológico (1400 - 1700 m/s)');
  }

  if (typeof bua_db_mhz !== 'number' || bua_db_mhz < 30 || bua_db_mhz > 140) {
    throw new Error('Atenuación acústica (bua_db_mhz) fuera de rango biológico (30 - 140 dB/MHz)');
  }

  // 1. CÁLCULO DEL STIFFNESS INDEX (Índice de Rigidez / Calidad Ósea)
  // Fórmula clínica de ultrasonómetro de calcáneo:
  // SI = (0.67 * BUA) + (0.28 * SOS) - 420
  const stiffnessIndexRaw = (0.67 * bua_db_mhz) + (0.28 * sos_ms) - 420;
  const stiffnessIndex = Number(stiffnessIndexRaw.toFixed(2));

  // 2. CÁLCULO ESTIMADO DE T-SCORE (Referencia adulto joven sano = 100, DE = 15)
  // T-Score = (SI - 100) / 15
  const tScoreRaw = (stiffnessIndex - 100) / 15;
  const tScore = Number(tScoreRaw.toFixed(2));

  // 3. CÁLCULO ESTIMADO DE Z-SCORE (Ajustado por edad astronauta)
  const zScoreRaw = (stiffnessIndex - 90) / 14;
  const zScore = Number(zScoreRaw.toFixed(2));

  // 4. EVALUACIÓN DE RESORCIÓN ÓSEA (Marcador sérico/urinario CTX - C-Telopéptido)
  // Rango normal en Tierra: < 300 ug/mmol. En microgravedad / 1/6 G suele dispararse > 400.
  let nivelResorcion = 'Normal';
  let alertaResorcion = false;
  if (ctx_ug_mmol > 400) {
    nivelResorcion = `Acelerada (${ctx_ug_mmol} µg/mmol · +55% sobre línea basal)`;
    alertaResorcion = true;
  } else if (ctx_ug_mmol > 300) {
    nivelResorcion = `Moderada (${ctx_ug_mmol} µg/mmol)`;
  }

  // 5. EVALUACIÓN DE CALCIURIA (Calcio urinario libre en mg/dL)
  // Rango normal: 5 - 20 mg/dL. > 20 indica hipercalciuria por pérdida trabecular.
  let estadoCalciuria = 'Fisiológica';
  let alertaCalciuria = false;
  if (calcium_urine_mg_dl > 22) {
    estadoCalciuria = `Elevada (${calcium_urine_mg_dl} mg/dL) · Riesgo de microcristales renales`;
    alertaCalciuria = true;
  }

  // 6. CLASIFICACIÓN DIAGNÓSTICA PREVENTIVA
  let clasificacion = 'Densidad Ósea Normal';
  if (tScore < -2.5) {
    clasificacion = 'Pérdida Trabecular Marcada (Osteopenia Acelerada 1/6 G)';
  } else if (tScore < -1.0) {
    clasificacion = 'Pérdida Trabecular Leve a Moderada';
  }

  // 7. PRESCRIPCIONES CLÍNICAS RECOMENDADAS PARA LA TRIPULACIÓN
  const recomendaciones = [];
  if (alertaResorcion || tScore < -1.5) {
    recomendaciones.push('Carga Mecánica: 30 min de ejercicio con bandas elásticas y arnés reactivo en rover.');
  }
  if (alertaCalciuria) {
    recomendaciones.push('Nefroprotección: Ingerir 350 ml de agua en los próximos 45 min para diluir el calcio libre.');
  }
  recomendaciones.push('Seguimiento acústico: Repetir escaneo QUS en Sol 45 (en 3 días).');

  return {
    astronaut_id,
    astronaut_name,
    mission_day: mission_day || 42,
    device_id: device_id || 'QUS-ROVER-04',
    timestamp: timestamp || new Date().toISOString(),
    metricas_originales: {
      sos_ms,
      bua_db_mhz,
      calcium_urine_mg_dl,
      ctx_ug_mmol
    },
    calculos: {
      stiffness_index: stiffnessIndex,
      t_score: tScore,
      z_score: zScore,
      clasificacion,
      nivel_resorcion: nivelResorcion,
      alerta_resorcion: alertaResorcion,
      estado_calciuria: estadoCalciuria,
      alerta_calciuria: alertaCalciuria,
      recomendaciones
    },
    procesado_en: new Date().toISOString()
  };
}

