import React, { useState } from 'react';
import { bioastroApi } from '../../services/bioastroApi';

const PREGUNTAS_PANAS = [
  { numero: 1, emocion: 'Interesado/a', dimension: 'PA', pregunta: '¿Te sentís interesado/a?' },
  { numero: 2, emocion: 'Angustiado/a', dimension: 'NA', pregunta: '¿Te sentís angustiado/a?' },
  { numero: 3, emocion: 'Entusiasmado/a', dimension: 'PA', pregunta: '¿Te sentís entusiasmado/a?' },
  { numero: 4, emocion: 'Molesto/a o disgustado/a', dimension: 'NA', pregunta: '¿Te sentís molesto/a o disgustado/a?' },
  { numero: 5, emocion: 'Fuerte', dimension: 'PA', pregunta: '¿Te sentís fuerte?' },
  { numero: 6, emocion: 'Culpable', dimension: 'NA', pregunta: '¿Te sentís culpable?' },
  { numero: 7, emocion: 'Entusiasta', dimension: 'PA', pregunta: '¿Te sentís entusiasta?' },
  { numero: 8, emocion: 'Asustado/a', dimension: 'NA', pregunta: '¿Te sentís asustado/a?' },
  { numero: 9, emocion: 'Orgulloso/a', dimension: 'PA', pregunta: '¿Te sentís orgulloso/a?' },
  { numero: 10, emocion: 'Hostil', dimension: 'NA', pregunta: '¿Te sentís hostil?' },
  { numero: 11, emocion: 'Alerta', dimension: 'PA', pregunta: '¿Te sentís alerta?' },
  { numero: 12, emocion: 'Irritable', dimension: 'NA', pregunta: '¿Te sentís irritable?' },
  { numero: 13, emocion: 'Inspirado/a', dimension: 'PA', pregunta: '¿Te sentís inspirado/a?' },
  { numero: 14, emocion: 'Avergonzado/a', dimension: 'NA', pregunta: '¿Te sentís avergonzado/a?' },
  { numero: 15, emocion: 'Decidido/a', dimension: 'PA', pregunta: '¿Te sentís decidido/a?' },
  { numero: 16, emocion: 'Nervioso/a', dimension: 'NA', pregunta: '¿Te sentís nervioso/a?' },
  { numero: 17, emocion: 'Atento/a', dimension: 'PA', pregunta: '¿Te sentís atento/a?' },
  { numero: 18, emocion: 'Inquieto/a o intranquilo/a', dimension: 'NA', pregunta: '¿Te sentís inquieto/a o intranquilo/a?' },
  { numero: 19, emocion: 'Activo/a', dimension: 'PA', pregunta: '¿Te sentís activo/a?' },
  { numero: 20, emocion: 'Temeroso/a', dimension: 'NA', pregunta: '¿Te sentís temeroso/a?' },
];

const OPCIONES_LIKERT = [
  { valor: 1, etiqueta: '1. Muy poco o nada' },
  { valor: 2, etiqueta: '2. Un poco' },
  { valor: 3, etiqueta: '3. Moderadamente' },
  { valor: 4, etiqueta: '4. Bastante' },
  { valor: 5, etiqueta: '5. Extremadamente' },
];

export default function TestPANAS({
  astronauta = { nombre: 'Cmdte. Alex Vega', tripulacion: 'Tripulación A' },
  onVolver,
  onVolverTests,
  onCambiarPerfil,
}) {
  const [pasoActual, setPasoActual] = useState(0);
  const [respuestas, setRespuestas] = useState(() => Array(20).fill(null));
  const [animando, setAnimando] = useState(false);
  const [direccion, setDireccion] = useState('adelante');
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState('');
  const [resultadoBackend, setResultadoBackend] = useState(null);
  const [mensajeBackend, setMensajeBackend] = useState('');

  const totalPreguntas = PREGUNTAS_PANAS.length;
  const itemActual = PREGUNTAS_PANAS[pasoActual];
  const respuestaActual = respuestas[pasoActual];
  const esUltimaPregunta = pasoActual === totalPreguntas - 1;
  const porcentajeProgreso = ((pasoActual + 1) / totalPreguntas) * 100;

  const seleccionarRespuesta = (valor) => {
    setError('');
    setRespuestas((prev) => {
      const copia = [...prev];
      copia[pasoActual] = valor;
      return copia;
    });
  };

  const cambiarPasoConTransicion = (nuevoPaso, dir) => {
    setDireccion(dir);
    setAnimando(true);
    setTimeout(() => {
      setPasoActual(nuevoPaso);
      setAnimando(false);
    }, 180);
  };

  const handleAnterior = () => {
    setError('');
    if (pasoActual > 0) {
      cambiarPasoConTransicion(pasoActual - 1, 'atras');
    } else if (onVolverTests) {
      onVolverTests();
    } else if (onVolver) {
      onVolver();
    }
  };

  const handleSiguienteOFinalizar = async () => {
    if (respuestaActual === null) {
      setError('Por favor, seleccioná una opción antes de continuar.');
      return;
    }

    if (!esUltimaPregunta) {
      setError('');
      cambiarPasoConTransicion(pasoActual + 1, 'adelante');
      return;
    }

    // Validar que todas las 20 respuestas estén completas
    const indiceFaltante = respuestas.findIndex(
      (r) => !Number.isInteger(r) || r < 1 || r > 5
    );
    if (indiceFaltante !== -1) {
      setError(`Falta responder la pregunta ${indiceFaltante + 1}.`);
      cambiarPasoConTransicion(indiceFaltante, 'atras');
      return;
    }

    setError('');
    setEnviando(true);
    try {
      const data = await bioastroApi.analizarPANAS(respuestas);
      const resultado = data.resultado ?? data;
      setResultadoBackend(resultado);
      setMensajeBackend(data.mensaje || 'PANAS calculado correctamente');
    } catch (err) {
      setError(
        err.message || 'Ocurrió un error al procesar la evaluación en el servidor.'
      );
    } finally {
      setEnviando(false);
    }
  };

  const reiniciarTest = () => {
    setRespuestas(Array(20).fill(null));
    setResultadoBackend(null);
    setMensajeBackend('');
    setError('');
    setPasoActual(0);
  };

  return (
    <div className="min-h-screen w-full bg-[#0b1320] text-[#eaf7ff] flex flex-col justify-between font-sans selection:bg-cyan-500 selection:text-slate-900">
      {/* HEADER SUPERIOR (ESTILO IMAGEN 1) */}
      <header className="w-full px-6 sm:px-10 py-4 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => (onVolver ? onVolver() : onVolverTests && onVolverTests())}
            className="px-5 py-2 rounded-xl text-xs sm:text-sm font-medium bg-[#112e2b] hover:bg-[#163d39] text-[#2ee59d] border border-[#2ee59d]/40 transition-all cursor-pointer"
          >
            Inicio
          </button>

          {onVolverTests && (
            <button
              type="button"
              onClick={onVolverTests}
              className="px-4 py-2 rounded-xl text-xs sm:text-sm font-medium text-[#a8c4d5] hover:text-white hover:bg-slate-800/50 transition-all cursor-pointer"
            >
              ← Evaluaciones
            </button>
          )}
        </div>

        <div className="flex items-center gap-4">
          <span className="text-xs sm:text-sm text-[#a8c4d5] font-medium">
            {astronauta?.nombre || 'Cmdte. Alex Vega'}
          </span>
          {onCambiarPerfil && (
            <button
              type="button"
              onClick={onCambiarPerfil}
              className="px-4 py-2 rounded-xl text-xs sm:text-sm font-medium bg-[#112e2b] hover:bg-[#163d39] text-[#2ee59d] border border-[#2ee59d]/40 transition-all cursor-pointer"
            >
              Cambiar perfil
            </button>
          )}
        </div>
      </header>

      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-6 sm:px-10 py-8 md:py-10 flex flex-col justify-center">
        {/* ENCABEZADO DEL TEST */}
        <div className="flex flex-col sm:flex-row items-start sm:items-start justify-between gap-4 mb-7">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Estado Emocional — PANAS
            </h1>
            <p className="text-[#a8c4d5] mt-2 text-base sm:text-lg leading-relaxed">
              Las siguientes palabras describen diferentes sentimientos y emociones. Indicá en qué medida experimentás cada una de ellas en este preciso momento.
            </p>
          </div>

          <div className="flex flex-col items-start sm:items-end gap-2.5 flex-shrink-0">
            <div className="bg-[#102a26] text-[#2ee59d] border border-[#2ee59d]/25 px-5 py-2 rounded-full text-xs sm:text-sm font-medium flex items-center gap-2.5 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#2ee59d] shadow-[0_0_8px_#2ee59d] animate-pulse"></span>
              <span>Todo en orden a bordo</span>
            </div>
            {!resultadoBackend && (
              <span className="text-sm sm:text-base text-[#a8c4d5] font-medium pr-1">
                Pregunta {pasoActual + 1} de {totalPreguntas}
              </span>
            )}
          </div>
        </div>

        {/* VISTA 1: CUESTIONARIO PASO A PASO */}
        {!resultadoBackend ? (
          <div className="bg-[#162234] border border-slate-800/90 rounded-3xl p-6 sm:p-10 shadow-2xl">
            {/* BARRA DE PROGRESO SUPERIOR */}
            <div className="w-full h-3 bg-[#3b495c]/60 rounded-full overflow-hidden mb-9">
              <div
                className="h-full bg-[#2ee59d] rounded-full transition-all duration-500 ease-out shadow-[0_0_12px_rgba(46,229,157,0.45)]"
                style={{ width: `${porcentajeProgreso}%` }}
              />
            </div>

            {/* CONTENEDOR CON TRANSICIÓN SUAVE ENTRE PASOS */}
            <div
              className={`transition-all duration-200 ease-out ${
                animando
                  ? direccion === 'adelante'
                    ? 'opacity-0 translate-x-4'
                    : 'opacity-0 -translate-x-4'
                  : 'opacity-100 translate-x-0'
              }`}
            >
              {/* PREGUNTA ACTUAL */}
              <div className="mb-8">
                <span className="text-xs font-mono uppercase tracking-wider text-[#57d9ed] block mb-1.5">
                  Ítem {itemActual.numero} · Emoción: {itemActual.emocion}
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {itemActual.numero}. {itemActual.pregunta}
                </h2>
              </div>

              {/* 5 OPCIONES ESCALA LIKERT (ESTILO PILLS IMAGEN 1) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
                {OPCIONES_LIKERT.map((opcion) => {
                  const seleccionada = respuestaActual === opcion.valor;
                  return (
                    <button
                      key={opcion.valor}
                      type="button"
                      onClick={() => seleccionarRespuesta(opcion.valor)}
                      className={`py-3.5 px-4 rounded-2xl text-sm sm:text-base transition-all duration-200 cursor-pointer text-center select-none border ${
                        seleccionada
                          ? 'bg-[#38d9e8] text-[#061826] border-[#57d9ed] font-bold shadow-[0_0_20px_rgba(56,217,232,0.35)] scale-[1.01]'
                          : 'bg-[#162234] hover:bg-[#1d2e46] text-[#a8c4d5] hover:text-white border-[#4b6a88]/70 font-medium'
                      }`}
                    >
                      {opcion.etiqueta}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* MENSAJE DE ERROR O VALIDACIÓN */}
            {error && (
              <div className="mt-6 px-4 py-3 rounded-2xl bg-rose-950/60 border border-rose-500/40 text-rose-200 text-xs sm:text-sm flex items-center gap-2.5">
                <span className="text-rose-400 font-bold">⚠</span>
                <span>{error}</span>
              </div>
            )}

            {/* BOTONES ANTERIOR Y SIGUIENTE / FINALIZAR */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-10">
              <button
                type="button"
                disabled={enviando}
                onClick={handleAnterior}
                className="w-full py-3.5 px-6 rounded-full border border-[#4b6a88]/70 bg-transparent hover:bg-slate-800/50 text-[#a8c4d5] hover:text-white font-medium text-base transition-all cursor-pointer disabled:opacity-50"
              >
                Anterior
              </button>

              <button
                type="button"
                disabled={enviando}
                onClick={handleSiguienteOFinalizar}
                className="w-full py-3.5 px-6 rounded-full bg-[#2ee59d] hover:bg-[#3df2aa] active:scale-[0.99] text-[#062018] font-bold text-base flex items-center justify-center gap-2 shadow-[0_0_22px_rgba(46,229,157,0.25)] transition-all cursor-pointer disabled:opacity-60"
              >
                {enviando ? (
                  <span>Procesando evaluación...</span>
                ) : esUltimaPregunta ? (
                  <span>Finalizar evaluación</span>
                ) : (
                  <>
                    <span>Siguiente</span>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </div>
        ) : (
          /* VISTA 2: PANTALLA DE RESULTADOS PROCESADOS POR EL BACKEND */
          <div className="bg-[#162234] border border-slate-800/90 rounded-3xl p-6 sm:p-10 shadow-2xl animate-fadeIn">
            {/* Banner de confirmación */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-[#2ee59d] block">
                  ✓ {mensajeBackend}
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
                  Resultados de Estado Emocional (PANAS)
                </h2>
                <p className="text-sm text-[#a8c4d5] mt-1">
                  Las dimensiones de Afecto Positivo (PA) y Afecto Negativo (NA) se reportan de manera independiente (escala de 10 a 50).
                </p>
              </div>

              <span className="px-4 py-1.5 rounded-full bg-[#0d1c2b] border border-slate-700 text-xs font-mono text-[#57d9ed]">
                20 respuestas procesadas
              </span>
            </div>

            {/* DOS INDICADORES VISUALES INDEPENDIENTES */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
              {/* Tarjeta Afecto Positivo (PA) */}
              <div className="bg-[#0d1c2b] border border-[#2ee59d]/30 rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-mono uppercase tracking-wider text-[#2ee59d]">
                        Dimensión Independiente
                      </span>
                      <h3 className="text-xl font-bold text-white mt-0.5">
                        Afecto Positivo (PA)
                      </h3>
                    </div>
                    <div className="text-right">
                      <span className="text-3xl sm:text-4xl font-black text-[#2ee59d] font-mono">
                        {resultadoBackend.pa}
                      </span>
                      <span className="text-sm text-[#a8c4d5] font-mono"> / 50</span>
                    </div>
                  </div>

                  {/* Barra visual para PA */}
                  <div className="mt-6">
                    <div className="flex justify-between text-xs text-[#a8c4d5] mb-2">
                      <span>Rango: 10 – 50</span>
                      <span>
                        Normalizado: {Number(resultadoBackend.paNormalizado).toFixed(2)} (
                        {Math.round(Number(resultadoBackend.paNormalizado) * 100)}%)
                      </span>
                    </div>
                    <div className="w-full h-3.5 bg-[#193148] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#2ee59d] rounded-full transition-all duration-700 shadow-[0_0_12px_rgba(46,229,157,0.5)]"
                        style={{
                          width: `${Math.max(
                            4,
                            Math.min(100, Number(resultadoBackend.paNormalizado) * 100)
                          )}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#a8c4d5] mt-5 leading-relaxed">
                  Refleja el nivel de energía, entusiasmo, concentración y disposición activa reportado en este momento de la misión.
                </p>
              </div>

              {/* Tarjeta Afecto Negativo (NA) */}
              <div className="bg-[#0d1c2b] border border-[#57d9ed]/30 rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-mono uppercase tracking-wider text-[#57d9ed]">
                        Dimensión Independiente
                      </span>
                      <h3 className="text-xl font-bold text-white mt-0.5">
                        Afecto Negativo (NA)
                      </h3>
                    </div>
                    <div className="text-right">
                      <span className="text-3xl sm:text-4xl font-black text-[#57d9ed] font-mono">
                        {resultadoBackend.na}
                      </span>
                      <span className="text-sm text-[#a8c4d5] font-mono"> / 50</span>
                    </div>
                  </div>

                  {/* Barra visual para NA */}
                  <div className="mt-6">
                    <div className="flex justify-between text-xs text-[#a8c4d5] mb-2">
                      <span>Rango: 10 – 50</span>
                      <span>
                        Normalizado: {Number(resultadoBackend.naNormalizado).toFixed(2)} (
                        {Math.round(Number(resultadoBackend.naNormalizado) * 100)}%)
                      </span>
                    </div>
                    <div className="w-full h-3.5 bg-[#193148] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#57d9ed] rounded-full transition-all duration-700 shadow-[0_0_12px_rgba(87,217,237,0.5)]"
                        style={{
                          width: `${Math.max(
                            4,
                            Math.min(100, Number(resultadoBackend.naNormalizado) * 100)
                          )}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#a8c4d5] mt-5 leading-relaxed">
                  Refleja el nivel de tensión subjetiva, inquietud o desgaste emocional registrado en este momento posterior o previo a actividad.
                </p>
              </div>
            </div>

            {/* Nota informativa no diagnóstica */}
            <div className="p-4 rounded-2xl bg-[#0d1c2b]/80 border border-slate-800 text-xs sm:text-sm text-[#a8c4d5]">
              <strong className="text-[#57d9ed]">Registro de seguimiento BioAstro:</strong>{' '}
              Estos indicadores representan una lectura puntual de autopercepción emocional y no constituyen un diagnóstico clínico ni una clasificación de aptitud médica.
            </div>

            {/* Botones de acción al finalizar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
              <button
                type="button"
                onClick={reiniciarTest}
                className="w-full py-3.5 px-5 rounded-full border border-[#4b6a88]/70 text-[#a8c4d5] hover:text-white hover:bg-slate-800/50 font-medium text-sm sm:text-base transition-all cursor-pointer"
              >
                Realizar nuevo registro
              </button>

              {onVolverTests && (
                <button
                  type="button"
                  onClick={onVolverTests}
                  className="w-full py-3.5 px-5 rounded-full border border-[#2ee59d]/50 bg-[#112e2b] hover:bg-[#163d39] text-[#2ee59d] font-semibold text-sm sm:text-base transition-all cursor-pointer"
                >
                  Volver a Evaluaciones
                </button>
              )}

              <button
                type="button"
                onClick={() => (onVolver ? onVolver() : onVolverTests && onVolverTests())}
                className="w-full py-3.5 px-5 rounded-full bg-[#2ee59d] hover:bg-[#3df2aa] text-[#062018] font-bold text-sm sm:text-base shadow-[0_0_20px_rgba(46,229,157,0.25)] transition-all cursor-pointer"
              >
                Volver al inicio
              </button>
            </div>
          </div>
        )}
      </main>

      {/* FOOTER INFERIOR (ESTILO IMAGEN 1) */}
      <footer className="w-full px-6 sm:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm">
        <div className="flex items-center gap-2 text-[#4d8ec4]">
          <span className="w-2 h-2 rounded-full bg-[#3b9eff]"></span>
          <span>Datos encriptados y listos para envío</span>
        </div>
        <div className="text-[#8ba3b8]">
          Tu bienestar también es parte de la misión.
        </div>
      </footer>
    </div>
  );
}
