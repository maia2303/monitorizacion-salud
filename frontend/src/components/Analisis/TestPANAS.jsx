import React, { useState } from 'react';
import { bioastroApi } from '../../services/bioastroApi';

const PREGUNTAS_PANAS = [
  { numero: 1, emocion: 'Interested', dimension: 'PA', pregunta: 'Do you feel interested?' },
  { numero: 2, emocion: 'Distressed', dimension: 'NA', pregunta: 'Do you feel distressed?' },
  { numero: 3, emocion: 'Excited', dimension: 'PA', pregunta: 'Do you feel excited?' },
  { numero: 4, emocion: 'Upset', dimension: 'NA', pregunta: 'Do you feel upset?' },
  { numero: 5, emocion: 'Strong', dimension: 'PA', pregunta: 'Do you feel strong?' },
  { numero: 6, emocion: 'Guilty', dimension: 'NA', pregunta: 'Do you feel guilty?' },
  { numero: 7, emocion: 'Enthusiastic', dimension: 'PA', pregunta: 'Do you feel enthusiastic?' },
  { numero: 8, emocion: 'Scared', dimension: 'NA', pregunta: 'Do you feel scared?' },
  { numero: 9, emocion: 'Proud', dimension: 'PA', pregunta: 'Do you feel proud?' },
  { numero: 10, emocion: 'Hostile', dimension: 'NA', pregunta: 'Do you feel hostile?' },
  { numero: 11, emocion: 'Alert', dimension: 'PA', pregunta: 'Do you feel alert?' },
  { numero: 12, emocion: 'Irritable', dimension: 'NA', pregunta: 'Do you feel irritable?' },
  { numero: 13, emocion: 'Inspired', dimension: 'PA', pregunta: 'Do you feel inspired?' },
  { numero: 14, emocion: 'Ashamed', dimension: 'NA', pregunta: 'Do you feel ashamed?' },
  { numero: 15, emocion: 'Determined', dimension: 'PA', pregunta: 'Do you feel determined?' },
  { numero: 16, emocion: 'Nervous', dimension: 'NA', pregunta: 'Do you feel nervous?' },
  { numero: 17, emocion: 'Attentive', dimension: 'PA', pregunta: 'Do you feel attentive?' },
  { numero: 18, emocion: 'Jittery', dimension: 'NA', pregunta: 'Do you feel jittery or restless?' },
  { numero: 19, emocion: 'Active', dimension: 'PA', pregunta: 'Do you feel active?' },
  { numero: 20, emocion: 'Afraid', dimension: 'NA', pregunta: 'Do you feel afraid?' },
];

const OPCIONES_LIKERT = [
  { valor: 1, etiqueta: '1. Very slightly or not at all' },
  { valor: 2, etiqueta: '2. A little' },
  { valor: 3, etiqueta: '3. Moderately' },
  { valor: 4, etiqueta: '4. Quite a bit' },
  { valor: 5, etiqueta: '5. Extremely' },
];

export default function TestPANAS({
  astronauta = { nombre: 'Cmdr. Alex Vega', tripulacion: 'Crew A' },
  onCambiarPestana,
  onVolver,
  onVolverTests,
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
      setError('Please select an option before continuing.');
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
      setError(`Question ${indiceFaltante + 1} needs to be answered.`);
      cambiarPasoConTransicion(indiceFaltante, 'atras');
      return;
    }

    setError('');
    setEnviando(true);
    try {
      const data = await bioastroApi.analizarPANAS(respuestas);
      const resultado = data.resultado ?? data;
      setResultadoBackend(resultado);
      setMensajeBackend(data.mensaje || 'PANAS calculated successfully');
    } catch (err) {
      setError(
        err.message || 'An error occurred while processing the evaluation on the server.'
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
    <div className="min-h-screen w-full bg-[#0b1220] text-[#eaf7ff] flex flex-col justify-between font-sans selection:bg-cyan-500 selection:text-slate-900">
      {/* HEADER SUPERIOR UNIFICADO */}
      <header className="px-6 sm:px-10 py-5 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs md:text-sm font-mono tracking-wider">
            <span className="font-bold text-slate-200">LUNAR ROVER</span>
            <span className="text-cyan-400 font-bold mx-1">//</span>
            <span className="text-slate-300 font-normal">DAY 42</span>
          </div>
          <div className="text-xs text-slate-400 mt-1">
            {astronauta.nombre} · {astronauta.tripulacion}
          </div>
        </div>

        <nav className="flex flex-wrap items-center gap-2 sm:mr-48">
          <button
            type="button"
            onClick={() => (onCambiarPestana ? onCambiarPestana('inicio') : onVolver && onVolver())}
            className="px-4 py-2 rounded-xl text-xs sm:text-sm font-medium tracking-wide text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 transition-colors cursor-pointer select-none"
          >
            Home
          </button>

          <button
            type="button"
            onClick={() => (onVolverTests ? onVolverTests() : onCambiarPestana && onCambiarPestana('tests'))}
            className="px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold tracking-wide bg-[#0d342f] text-[#34d399] border border-emerald-500/30 shadow-[0_0_15px_rgba(52,211,153,0.15)] cursor-pointer select-none"
          >
            Wellness & Tests
          </button>

          <button
            type="button"
            onClick={() => onCambiarPestana && onCambiarPestana('test_orina')}
            className="px-4 py-2 rounded-xl text-xs sm:text-sm font-medium tracking-wide text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 transition-colors cursor-pointer select-none"
          >
            Urine Test
          </button>

          <button
            type="button"
            onClick={() => onCambiarPestana && onCambiarPestana('test_pvc')}
            className="px-4 py-2 rounded-xl text-xs sm:text-sm font-medium tracking-wide text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 transition-colors cursor-pointer select-none"
          >
            CVP Test
          </button>

          <button
            type="button"
            onClick={() => onCambiarPestana && onCambiarPestana('test_qus')}
            className="px-4 py-2 rounded-xl text-xs sm:text-sm font-medium tracking-wide text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 transition-colors cursor-pointer select-none"
          >
            QUS Test
          </button>
        </nav>
      </header>

      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-6 sm:px-10 py-8 md:py-10 flex flex-col justify-center">
        {/* ENCABEZADO DEL TEST */}
        <div className="flex flex-col sm:flex-row items-start sm:items-start justify-between gap-4 mb-7">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Emotional State — PANAS
            </h1>
            <p className="text-[#a8c4d5] mt-2 text-base sm:text-lg leading-relaxed">
              The following words describe different feelings and emotions. Indicate to what extent you experience each one at this exact moment.
            </p>
          </div>

          <div className="flex flex-col items-start sm:items-end gap-2.5 flex-shrink-0">
            <div className="bg-[#102a26] text-[#2ee59d] border border-[#2ee59d]/25 px-5 py-2 rounded-full text-xs sm:text-sm font-medium flex items-center gap-2.5 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#2ee59d] shadow-[0_0_8px_#2ee59d] animate-pulse"></span>
              <span>All systems nominal on board</span>
            </div>
            {!resultadoBackend && (
              <span className="text-sm sm:text-base text-[#a8c4d5] font-medium pr-1">
                Question {pasoActual + 1} of {totalPreguntas}
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
                  Item {itemActual.numero} · Emotion: {itemActual.emocion}
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
                Previous
              </button>

              <button
                type="button"
                disabled={enviando}
                onClick={handleSiguienteOFinalizar}
                className="w-full py-3.5 px-6 rounded-full bg-[#2ee59d] hover:bg-[#3df2aa] active:scale-[0.99] text-[#062018] font-bold text-base flex items-center justify-center gap-2 shadow-[0_0_22px_rgba(46,229,157,0.25)] transition-all cursor-pointer disabled:opacity-60"
              >
                {enviando ? (
                  <span>Processing evaluation...</span>
                ) : esUltimaPregunta ? (
                  <span>Finish evaluation</span>
                ) : (
                  <>
                    <span>Next</span>
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
                  Emotional State Results (PANAS)
                </h2>
                <p className="text-sm text-[#a8c4d5] mt-1">
                  Positive Affect (PA) and Negative Affect (NA) dimensions are reported independently (scale 10 to 50).
                </p>
              </div>

              <span className="px-4 py-1.5 rounded-full bg-[#0d1c2b] border border-slate-700 text-xs font-mono text-[#57d9ed]">
                20 responses processed
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
                        Independent Dimension
                      </span>
                      <h3 className="text-xl font-bold text-white mt-0.5">
                        Positive Affect (PA)
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
                      <span>Range: 10 – 50</span>
                      <span>
                        Normalized: {Number(resultadoBackend.paNormalizado).toFixed(2)} (
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
                  Reflects the level of energy, enthusiasm, focus, and active engagement reported at this moment in the mission.
                </p>
              </div>

              {/* Tarjeta Afecto Negativo (NA) */}
              <div className="bg-[#0d1c2b] border border-[#57d9ed]/30 rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-mono uppercase tracking-wider text-[#57d9ed]">
                        Independent Dimension
                      </span>
                      <h3 className="text-xl font-bold text-white mt-0.5">
                        Negative Affect (NA)
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
                      <span>Range: 10 – 50</span>
                      <span>
                        Normalized: {Number(resultadoBackend.naNormalizado).toFixed(2)} (
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
                  Reflects the level of subjective tension, restlessness, or emotional wear recorded at this moment before or after activity.
                </p>
              </div>
            </div>

            {/* Nota informativa no diagnóstica */}
            <div className="p-4 rounded-2xl bg-[#0d1c2b]/80 border border-slate-800 text-xs sm:text-sm text-[#a8c4d5]">
              <strong className="text-[#57d9ed]">BioAstro tracking log:</strong>{' '}
              These indicators represent a punctual reading of emotional self-perception and do not constitute a clinical diagnosis or medical fitness classification.
            </div>

            {/* Botones de acción al finalizar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
              <button
                type="button"
                onClick={reiniciarTest}
                className="w-full py-3.5 px-5 rounded-full border border-[#4b6a88]/70 text-[#a8c4d5] hover:text-white hover:bg-slate-800/50 font-medium text-sm sm:text-base transition-all cursor-pointer"
              >
                Perform new entry
              </button>

              {onVolverTests && (
                <button
                  type="button"
                  onClick={onVolverTests}
                  className="w-full py-3.5 px-5 rounded-full border border-[#2ee59d]/50 bg-[#112e2b] hover:bg-[#163d39] text-[#2ee59d] font-semibold text-sm sm:text-base transition-all cursor-pointer"
                >
                  Back to Evaluations
                </button>
              )}

              <button
                type="button"
                onClick={() => (onVolver ? onVolver() : onVolverTests && onVolverTests())}
                className="w-full py-3.5 px-5 rounded-full bg-[#2ee59d] hover:bg-[#3df2aa] text-[#062018] font-bold text-sm sm:text-base shadow-[0_0_20px_rgba(46,229,157,0.25)] transition-all cursor-pointer"
              >
                Back to Home
              </button>
            </div>
          </div>
        )}
      </main>

      {/* FOOTER INFERIOR (ESTILO IMAGEN 1) */}
      <footer className="w-full px-6 sm:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm">
        <div className="flex items-center gap-2 text-[#4d8ec4]">
          <span className="w-2 h-2 rounded-full bg-[#3b9eff]"></span>
          <span>Data encrypted and ready for transmission</span>
        </div>
        <div className="text-[#8ba3b8]">
          Your wellness is also part of the mission.
        </div>
      </footer>
    </div>
  );
}
