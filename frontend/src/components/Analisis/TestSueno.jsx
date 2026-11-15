import React, { useState } from 'react';
import { bioastroApi } from '../../services/bioastroApi';

const OPCIONES_LATENCIA = [
  { valor: 'MENOS_15', etiqueta: 'Less than 15 minutes' },
  { valor: '15_30', etiqueta: 'Between 15 and 30 minutes' },
  { valor: '30_60', etiqueta: 'Between 30 and 60 minutes' },
  { valor: 'MAS_60', etiqueta: 'More than 60 minutes' },
];

const OPCIONES_DESPERTARES = [
  { modo: '0', etiqueta: 'None', valor: 0 },
  { modo: '1', etiqueta: 'Once', valor: 1 },
  { modo: '2', etiqueta: 'Twice', valor: 2 },
  { modo: '3+', etiqueta: 'Three or more times', valor: 3 },
];

const OPCIONES_MAS_30_MIN = [
  { valor: true, etiqueta: 'Yes' },
  { valor: false, etiqueta: 'No' },
];

const OPCIONES_CALIDAD_DESPERTAR = [
  { valor: 'BIEN', etiqueta: 'Good, rested and refreshed' },
  { valor: 'REGULAR', etiqueta: 'Fair, somewhat tired' },
  { valor: 'CANSADO', etiqueta: 'Tired, feeling sluggish' },
];

const OPCIONES_INTERRUPCIONES = [
  { valor: 'RUIDO', etiqueta: 'Habitat noises' },
  { valor: 'TEMPERATURA', etiqueta: 'Uncomfortable temperature' },
  { valor: 'MENTE_ACTIVA', etiqueta: 'Active mind / racing thoughts' },
  { valor: 'OTRO', etiqueta: 'Other reason' },
];

const OPCIONES_CAPACIDAD_ROVER = [
  { valor: 'OPTIMA', etiqueta: 'Optimal: feeling very prepared' },
  { valor: 'ESTANDAR', etiqueta: 'Standard: able to perform routine activities' },
  { valor: 'COPILOTO', etiqueta: 'Prefer co-pilot or support tasks' },
];

const ETIQUETAS_LATENCIA = {
  MENOS_15: 'Less than 15 minutes',
  '15_30': 'Between 15 and 30 minutes',
  '30_60': 'Between 30 and 60 minutes',
  MAS_60: 'More than 60 minutes',
};

const ETIQUETAS_CALIDAD = {
  BIEN: 'Good, rested and refreshed',
  REGULAR: 'Fair, somewhat tired',
  CANSADO: 'Tired, feeling sluggish',
};

const ETIQUETAS_INTERRUPCION = {
  RUIDO: 'Habitat noises',
  TEMPERATURA: 'Uncomfortable temperature',
  MENTE_ACTIVA: 'Active mind / racing thoughts',
  OTRO: 'Other reason',
};

const ETIQUETAS_CAPACIDAD = {
  OPTIMA: 'Optimal: feeling very prepared',
  ESTANDAR: 'Standard: able to perform routine activities',
  COPILOTO: 'Prefer co-pilot or support tasks',
};

export default function TestSueno({
  astronauta = { nombre: 'Cmdr. Alex Vega', tripulacion: 'Crew A' },
  onCambiarPestana,
  onVolver,
  onVolverTests,
}) {
  const [pasoActual, setPasoActual] = useState(0);
  const [animando, setAnimando] = useState(false);
  const [direccion, setDireccion] = useState('adelante');

  // Estados de las 6 preguntas
  const [latenciaSueno, setLatenciaSueno] = useState(null);
  const [modoDespertares, setModoDespertares] = useState(null);
  const [cantidadDespertares, setCantidadDespertares] = useState(null);
  const [despiertoMas30Min, setDespiertoMas30Min] = useState(null);
  const [calidadDespertar, setCalidadDespertar] = useState(null);
  const [interrupciones, setInterrupciones] = useState([]);
  const [sinInterrupcionesConfirmado, setSinInterrupcionesConfirmado] = useState(false);
  const [capacidadRover, setCapacidadRover] = useState(null);

  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState('');
  const [resultadoBackend, setResultadoBackend] = useState(null);
  const [mensajeBackend, setMensajeBackend] = useState('');

  const totalPreguntas = 6;
  const esUltimaPregunta = pasoActual === totalPreguntas - 1;
  const porcentajeProgreso = ((pasoActual + 1) / totalPreguntas) * 100;

  const cambiarPasoConTransicion = (nuevoPaso, dir) => {
    setDireccion(dir);
    setAnimando(true);
    setTimeout(() => {
      setPasoActual(nuevoPaso);
      setAnimando(false);
    }, 180);
  };

  const seleccionarModoDespertares = (opcion) => {
    setError('');
    setModoDespertares(opcion.modo);
    if (opcion.modo === '3+') {
      setCantidadDespertares((prev) =>
        Number.isInteger(prev) && prev >= 3 && prev <= 30 ? prev : 3
      );
    } else {
      setCantidadDespertares(opcion.valor);
    }
  };

  const handleCambioNumeroExacto = (valorTexto) => {
    setError('');
    if (valorTexto === '') {
      setCantidadDespertares('');
      return;
    }
    const numero = Number.parseInt(valorTexto, 10);
    if (!Number.isNaN(numero)) {
      setCantidadDespertares(Math.max(3, Math.min(30, numero)));
    }
  };

  const toggleInterrupcion = (motivo) => {
    setError('');
    setSinInterrupcionesConfirmado(false);
    setInterrupciones((prev) => {
      if (prev.includes(motivo)) {
        return prev.filter((item) => item !== motivo);
      }
      return Array.from(new Set([...prev, motivo]));
    });
  };

  const seleccionarNingunaInterrupcion = () => {
    setError('');
    setInterrupciones([]);
    setSinInterrupcionesConfirmado(true);
  };

  const validarPasoActual = () => {
    if (pasoActual === 0 && !latenciaSueno) {
      return 'Select how long it took you to fall asleep.';
    }
    if (pasoActual === 1) {
      if (
        modoDespertares === null ||
        cantidadDespertares === '' ||
        !Number.isInteger(Number(cantidadDespertares)) ||
        Number(cantidadDespertares) < 0 ||
        Number(cantidadDespertares) > 30
      ) {
        return 'Indicate a valid number of awakenings (integer between 0 and 30).';
      }
      if (modoDespertares === '3+' && Number(cantidadDespertares) < 3) {
        return 'For "Three or more times", specify a number between 3 and 30.';
      }
    }
    if (pasoActual === 2 && typeof despiertoMas30Min !== 'boolean') {
      return 'Indicate whether you were awake for more than 30 consecutive minutes.';
    }
    if (pasoActual === 3 && !calidadDespertar) {
      return 'Select how you felt upon waking.';
    }
    if (pasoActual === 5 && !capacidadRover) {
      return 'Select how you perceive your ability to perform rover activities today.';
    }
    return '';
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
    const mensajeError = validarPasoActual();
    if (mensajeError) {
      setError(mensajeError);
      return;
    }

    if (!esUltimaPregunta) {
      setError('');
      cambiarPasoConTransicion(pasoActual + 1, 'adelante');
      return;
    }

    const payload = {
      latenciaSueno,
      cantidadDespertares: Number(cantidadDespertares),
      despiertoMas30Min,
      calidadDespertar,
      interrupciones: Array.from(new Set(interrupciones)),
      capacidadRover,
    };

    setError('');
    setEnviando(true);
    try {
      const data = await bioastroApi.analizarSueno(payload);
      const resultado = data.resultado ?? data;
      setResultadoBackend(resultado);
      setMensajeBackend(data.mensaje || 'Sleep data validated successfully');
    } catch (err) {
      setError(
        err.message || 'Could not process sleep log on the server.'
      );
    } finally {
      setEnviando(false);
    }
  };

  const reiniciarFormulario = () => {
    setPasoActual(0);
    setLatenciaSueno(null);
    setModoDespertares(null);
    setCantidadDespertares(null);
    setDespiertoMas30Min(null);
    setCalidadDespertar(null);
    setInterrupciones([]);
    setSinInterrupcionesConfirmado(false);
    setCapacidadRover(null);
    setResultadoBackend(null);
    setMensajeBackend('');
    setError('');
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
              Sleep Quality — Pre-Rover Rest
            </h1>
            <p className="text-[#a8c4d5] mt-2 text-base sm:text-lg leading-relaxed">
              Before starting your workday, we want to know how your rest was. Answer the following questions about your last night of sleep.
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

        {/* VISTA 1: FORMULARIO PASO A PASO */}
        {!resultadoBackend ? (
          <div className="bg-[#162234] border border-slate-800/90 rounded-3xl p-6 sm:p-10 shadow-2xl">
            {/* BARRA DE PROGRESO */}
            <div className="w-full h-3 bg-[#3b495c]/60 rounded-full overflow-hidden mb-9">
              <div
                className="h-full bg-[#2ee59d] rounded-full transition-all duration-500 ease-out shadow-[0_0_12px_rgba(46,229,157,0.45)]"
                style={{ width: `${porcentajeProgreso}%` }}
              />
            </div>

            {/* PASO ACTUAL CON TRANSICIÓN SUAVE */}
            <div
              className={`transition-all duration-200 ease-out ${
                animando
                  ? direccion === 'adelante'
                    ? 'opacity-0 translate-x-4'
                    : 'opacity-0 -translate-x-4'
                  : 'opacity-100 translate-x-0'
              }`}
            >
              {/* PREGUNTA 1: LATENCIA DEL SUEÑO */}
              {pasoActual === 0 && (
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-[#57d9ed] block mb-1.5">
                    Sleep Onset / Latency
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-8">
                    1. How long did it take you to fall asleep?
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                    {OPCIONES_LATENCIA.map((op) => {
                      const activa = latenciaSueno === op.valor;
                      return (
                        <button
                          key={op.valor}
                          type="button"
                          onClick={() => {
                            setError('');
                            setLatenciaSueno(op.valor);
                          }}
                          className={`py-4 px-5 rounded-2xl text-sm sm:text-base transition-all duration-200 cursor-pointer text-center select-none border ${
                            activa
                              ? 'bg-[#38d9e8] text-[#061826] border-[#57d9ed] font-bold shadow-[0_0_20px_rgba(56,217,232,0.35)] scale-[1.01]'
                              : 'bg-[#162234] hover:bg-[#1d2e46] text-[#a8c4d5] hover:text-white border-[#4b6a88]/70 font-medium'
                          }`}
                        >
                          {op.etiqueta}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* PREGUNTA 2: CANTIDAD DE DESPERTARES */}
              {pasoActual === 1 && (
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-[#57d9ed] block mb-1.5">
                    Nighttime Continuity
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-8">
                    2. How many times did you wake up during the night?
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                    {OPCIONES_DESPERTARES.map((op) => {
                      const activa = modoDespertares === op.modo;
                      return (
                        <button
                          key={op.modo}
                          type="button"
                          onClick={() => seleccionarModoDespertares(op)}
                          className={`py-4 px-5 rounded-2xl text-sm sm:text-base transition-all duration-200 cursor-pointer text-center select-none border ${
                            activa
                              ? 'bg-[#38d9e8] text-[#061826] border-[#57d9ed] font-bold shadow-[0_0_20px_rgba(56,217,232,0.35)] scale-[1.01]'
                              : 'bg-[#162234] hover:bg-[#1d2e46] text-[#a8c4d5] hover:text-white border-[#4b6a88]/70 font-medium'
                          }`}
                        >
                          {op.etiqueta}
                        </button>
                      );
                    })}
                  </div>

                  {/* Si elige "Three or more times", especificar número exacto (3 a 30) */}
                  {modoDespertares === '3+' && (
                    <div className="mt-6 p-5 rounded-2xl bg-[#0d1c2b] border border-[#57d9ed]/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-fadeIn">
                      <div>
                        <label
                          htmlFor="input-despertares"
                          className="text-sm sm:text-base font-semibold text-white block"
                        >
                          Specify the exact number of awakenings:
                        </label>
                        <span className="text-xs text-[#a8c4d5]">
                          Enter an integer value between 3 and 30.
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() =>
                            setCantidadDespertares((prev) =>
                              Math.max(3, (Number(prev) || 3) - 1)
                            )
                          }
                          className="w-10 h-10 rounded-xl bg-[#162234] border border-[#4b6a88] text-white font-bold hover:bg-[#1f314b] cursor-pointer"
                        >
                          −
                        </button>
                        <input
                          id="input-despertares"
                          type="number"
                          min={3}
                          max={30}
                          value={cantidadDespertares ?? 3}
                          onChange={(e) => handleCambioNumeroExacto(e.target.value)}
                          className="w-24 text-center py-2 px-3 rounded-xl bg-[#162234] border border-[#57d9ed] text-white font-bold text-lg focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setCantidadDespertares((prev) =>
                              Math.min(30, (Number(prev) || 3) + 1)
                            )
                          }
                          className="w-10 h-10 rounded-xl bg-[#162234] border border-[#4b6a88] text-white font-bold hover:bg-[#1f314b] cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* PREGUNTA 3: DESPIERTO MÁS DE 30 MINUTOS */}
              {pasoActual === 2 && (
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-[#57d9ed] block mb-1.5">
                    Nighttime Wakefulness
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-8">
                    3. Were you awake for more than 30 consecutive minutes?
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl">
                    {OPCIONES_MAS_30_MIN.map((op) => {
                      const activa = despiertoMas30Min === op.valor;
                      return (
                        <button
                          key={String(op.valor)}
                          type="button"
                          onClick={() => {
                            setError('');
                            setDespiertoMas30Min(op.valor);
                          }}
                          className={`py-4 px-6 rounded-2xl text-base transition-all duration-200 cursor-pointer text-center select-none border ${
                            activa
                              ? 'bg-[#38d9e8] text-[#061826] border-[#57d9ed] font-bold shadow-[0_0_20px_rgba(56,217,232,0.35)] scale-[1.01]'
                              : 'bg-[#162234] hover:bg-[#1d2e46] text-[#a8c4d5] hover:text-white border-[#4b6a88]/70 font-medium'
                          }`}
                        >
                          {op.etiqueta}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* PREGUNTA 4: CALIDAD AL DESPERTAR */}
              {pasoActual === 3 && (
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-[#57d9ed] block mb-1.5">
                    Morning Recovery
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-8">
                    4. How did you feel upon waking?
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {OPCIONES_CALIDAD_DESPERTAR.map((op) => {
                      const activa = calidadDespertar === op.valor;
                      return (
                        <button
                          key={op.valor}
                          type="button"
                          onClick={() => {
                            setError('');
                            setCalidadDespertar(op.valor);
                          }}
                          className={`py-4 px-5 rounded-2xl text-sm sm:text-base transition-all duration-200 cursor-pointer text-center select-none border ${
                            activa
                              ? 'bg-[#38d9e8] text-[#061826] border-[#57d9ed] font-bold shadow-[0_0_20px_rgba(56,217,232,0.35)] scale-[1.01]'
                              : 'bg-[#162234] hover:bg-[#1d2e46] text-[#a8c4d5] hover:text-white border-[#4b6a88]/70 font-medium'
                          }`}
                        >
                          {op.etiqueta}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* PREGUNTA 5: INTERRUPCIONES (SELECCIÓN MÚLTIPLE / CHECKBOXES) */}
              {pasoActual === 4 && (
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-[#57d9ed] block mb-1.5">
                    Environmental & Personal Factors · Multiple Selection
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2">
                    5. What factors interrupted your rest?
                  </h2>
                  <p className="text-xs sm:text-sm text-[#a8c4d5] mb-6">
                    You can select one or multiple options, or indicate that there were no interruptions.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {OPCIONES_INTERRUPCIONES.map((op) => {
                      const marcada = interrupciones.includes(op.valor);
                      return (
                        <button
                          key={op.valor}
                          type="button"
                          onClick={() => toggleInterrupcion(op.valor)}
                          className={`py-4 px-5 rounded-2xl text-sm sm:text-base transition-all duration-200 cursor-pointer flex items-center justify-between select-none border ${
                            marcada
                              ? 'bg-[#38d9e8] text-[#061826] border-[#57d9ed] font-bold shadow-[0_0_20px_rgba(56,217,232,0.35)]'
                              : 'bg-[#162234] hover:bg-[#1d2e46] text-[#a8c4d5] hover:text-white border-[#4b6a88]/70 font-medium'
                          }`}
                        >
                          <span>{op.etiqueta}</span>
                          <span
                            className={`w-5 h-5 rounded-md flex items-center justify-center text-xs border ${
                              marcada
                                ? 'bg-[#061826] text-[#38d9e8] border-[#061826]'
                                : 'border-[#4b6a88]'
                            }`}
                          >
                            {marcada ? '✓' : ''}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Opción explícita sin interrupciones */}
                  <div className="mt-4">
                    <button
                      type="button"
                      onClick={seleccionarNingunaInterrupcion}
                      className={`w-full sm:w-auto py-2.5 px-5 rounded-xl text-xs sm:text-sm transition-all cursor-pointer border ${
                        interrupciones.length === 0 && sinInterrupcionesConfirmado
                          ? 'bg-[#112e2b] text-[#2ee59d] border-[#2ee59d] font-semibold'
                          : 'bg-[#0d1c2b] text-[#a8c4d5] hover:text-white border-slate-700'
                      }`}
                    >
                      ✓ No factors interrupted my rest
                    </button>
                  </div>
                </div>
              )}

              {/* PREGUNTA 6: CAPACIDAD AUTOPERCIBIDA PARA EL ROVER */}
              {pasoActual === 5 && (
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-[#57d9ed] block mb-1.5">
                    Pre-Activity Self-Perception
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2">
                    6. How do you perceive your ability to perform rover activities today?
                  </h2>
                  <p className="text-xs sm:text-sm text-[#a8c4d5] mb-6">
                    This response is a personal perception of the astronaut and does not constitute an operational or medical clearance.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {OPCIONES_CAPACIDAD_ROVER.map((op) => {
                      const activa = capacidadRover === op.valor;
                      return (
                        <button
                          key={op.valor}
                          type="button"
                          onClick={() => {
                            setError('');
                            setCapacidadRover(op.valor);
                          }}
                          className={`py-4 px-5 rounded-2xl text-sm sm:text-base transition-all duration-200 cursor-pointer text-center select-none border ${
                            activa
                              ? 'bg-[#38d9e8] text-[#061826] border-[#57d9ed] font-bold shadow-[0_0_20px_rgba(56,217,232,0.35)] scale-[1.01]'
                              : 'bg-[#162234] hover:bg-[#1d2e46] text-[#a8c4d5] hover:text-white border-[#4b6a88]/70 font-medium'
                          }`}
                        >
                          {op.etiqueta}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
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
                  <span>Processing log...</span>
                ) : esUltimaPregunta ? (
                  <span>Finish log</span>
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
          /* VISTA 2: RESUMEN DE RESPUESTAS VALIDADAS POR EL BACKEND */
          <div className="bg-[#162234] border border-slate-800/90 rounded-3xl p-6 sm:p-10 shadow-2xl animate-fadeIn">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-[#2ee59d] block">
                  ✓ {mensajeBackend}
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
                  Pre-Rover Rest Summary
                </h2>
                <p className="text-sm text-[#a8c4d5] mt-1">
                  The log was validated and processed by the BioAstro server.
                </p>
              </div>

              <span className="px-4 py-1.5 rounded-full bg-[#102a26] border border-[#2ee59d]/30 text-xs font-mono text-[#2ee59d]">
                Log completed
              </span>
            </div>

            {/* TARJETAS DE DATOS REPORTADOS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 my-8">
              {/* 1. Latencia de sueño */}
              <div className="bg-[#0d1c2b] border border-slate-800 rounded-2xl p-5">
                <span className="text-xs font-mono uppercase tracking-wider text-[#57d9ed] block">
                  Time to fall asleep
                </span>
                <div className="text-lg font-bold text-white mt-2">
                  {ETIQUETAS_LATENCIA[resultadoBackend.latenciaSueno] ||
                    resultadoBackend.latenciaSueno}
                </div>
              </div>

              {/* 2. Cantidad de despertares */}
              <div className="bg-[#0d1c2b] border border-slate-800 rounded-2xl p-5">
                <span className="text-xs font-mono uppercase tracking-wider text-[#57d9ed] block">
                  Number of awakenings
                </span>
                <div className="text-lg font-bold text-white mt-2">
                  {resultadoBackend.cantidadDespertares === 0
                    ? 'None (0)'
                    : resultadoBackend.cantidadDespertares === 1
                    ? '1 time'
                    : `${resultadoBackend.cantidadDespertares} times`}
                </div>
                <span className="text-xs text-[#a8c4d5] mt-1 block">
                  Awake +30 min continuously:{' '}
                  <strong className="text-white">
                    {resultadoBackend.despiertoMas30Min ? 'Yes' : 'No'}
                  </strong>
                </span>
              </div>

              {/* 3. Calidad del despertar */}
              <div className="bg-[#0d1c2b] border border-slate-800 rounded-2xl p-5">
                <span className="text-xs font-mono uppercase tracking-wider text-[#57d9ed] block">
                  Wake-up quality
                </span>
                <div className="text-lg font-bold text-white mt-2">
                  {ETIQUETAS_CALIDAD[resultadoBackend.calidadDespertar] ||
                    resultadoBackend.calidadDespertar}
                </div>
              </div>

              {/* 4. Interrupciones seleccionadas */}
              <div className="bg-[#0d1c2b] border border-slate-800 rounded-2xl p-5 sm:col-span-2 lg:col-span-1">
                <span className="text-xs font-mono uppercase tracking-wider text-[#57d9ed] block">
                  Reported interruptions
                </span>
                {Array.isArray(resultadoBackend.interrupciones) &&
                resultadoBackend.interrupciones.length > 0 ? (
                  <div className="flex flex-wrap gap-2 mt-2.5">
                    {resultadoBackend.interrupciones.map((codigo) => (
                      <span
                        key={codigo}
                        className="px-3 py-1 rounded-full bg-[#193148] border border-[#57d9ed]/30 text-xs font-medium text-[#eaf7ff]"
                      >
                        {ETIQUETAS_INTERRUPCION[codigo] || codigo}
                      </span>
                    ))}
                  </div>
                ) : (
                  <div className="text-base font-semibold text-[#2ee59d] mt-2">
                    No interruptions reported
                  </div>
                )}
              </div>

              {/* 5. Preparación autopercibida para el rover */}
              <div className="bg-[#0d1c2b] border border-[#2ee59d]/30 rounded-2xl p-5 sm:col-span-2">
                <span className="text-xs font-mono uppercase tracking-wider text-[#2ee59d] block">
                  Self-perceived Readiness — Rover Activity
                </span>
                <div className="text-lg font-bold text-white mt-2">
                  {ETIQUETAS_CAPACIDAD[resultadoBackend.capacidadRover] ||
                    resultadoBackend.capacidadRover}
                </div>
                <p className="text-xs text-[#a8c4d5] mt-1.5">
                  Subjective perception logged by the crewmember prior to lunar operation (does not represent an automated medical ruling).
                </p>
              </div>
            </div>

            {/* Botones de acción al finalizar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
              <button
                type="button"
                onClick={reiniciarFormulario}
                className="w-full py-3.5 px-5 rounded-full border border-[#4b6a88]/70 text-[#a8c4d5] hover:text-white hover:bg-slate-800/50 font-medium text-sm sm:text-base transition-all cursor-pointer"
              >
                Log again
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
