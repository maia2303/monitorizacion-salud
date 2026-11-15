import React, { useState } from 'react';

const OPCIONES_HORAS = ['0–1 h', '1–2 h', '2–3 h', '3–4 h'];

export default function ActividadDiaria({
  astronauta = { nombre: 'Cmdr. Alex Vega', tripulacion: 'Crew A' },
  onCambiarPestana,
}) {
  // Valores seleccionados para cada tipo de actividad
  const [manejoRover, setManejoRover] = useState('3–4 h');
  const [caminataEVA, setCaminataEVA] = useState('1–2 h');
  const [ejercicioResistencia, setEjercicioResistencia] = useState('1–2 h');

  // Control de cuál solapa desplegable está abierta
  const [solapaAbierta, setSolapaAbierta] = useState(null);

  const toggleSolapa = (clave) => {
    setSolapaAbierta((prev) => (prev === clave ? null : clave));
  };

  const seleccionarOpcion = (clave, valor) => {
    if (clave === 'rover') setManejoRover(valor);
    if (clave === 'eva') setCaminataEVA(valor);
    if (clave === 'resistencia') setEjercicioResistencia(valor);
    setSolapaAbierta(null);
  };

  // Cálculo dinámico de progreso según las actividades ingresadas
  const calcularProgreso = () => {
    let puntos = 0;
    const mapa = { '0–1 h': 10, '1–2 h': 20, '2–3 h': 30, '3–4 h': 35 };
    puntos += mapa[manejoRover] || 25;
    puntos += (mapa[caminataEVA] || 20) * 1.2;
    puntos += (mapa[ejercicioResistencia] || 15) * 1.4;
    return Math.min(100, Math.round(puntos));
  };

  const progreso = calcularProgreso();

  // Mensaje adaptativo según el ejercicio de resistencia
  const getMensajeCuidado = () => {
    if (ejercicioResistencia === '3–4 h' || ejercicioResistencia === '2–3 h') {
      return 'Excellent effort today! You have completed the mechanical stimulation needed to protect your bone density in 1/6 G.';
    }
    if (ejercicioResistencia === '1–2 h') {
      return 'Great pace today. Only 30 min of resistance exercise needed to protect your bone density and finish the day.';
    }
    return 'Low bone load recorded. Remember to perform at least 30 min with resistance bands before resting.';
  };

  return (
    <div className="w-full bg-[#0b1220] text-slate-100 flex flex-col justify-between font-sans selection:bg-cyan-500 selection:text-slate-900 min-h-screen">
      
      {/* HEADER SUPERIOR CON NAVBAR INTEGRADO EXACTAMENTE COMO LA IMAGEN */}
      <header className="px-6 sm:px-10 py-5 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
        {/* Lado izquierdo: LUNAR ROVER // DAY 42 */}
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

        {/* Pestañas de navegación superiores */}
        <nav className="flex flex-wrap items-center gap-2 sm:mr-48">
          <button
            type="button"
            className="px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold tracking-wide bg-[#0d342f] text-[#34d399] border border-emerald-500/30 shadow-[0_0_15px_rgba(52,211,153,0.15)] cursor-pointer select-none"
          >
            Home
          </button>

          <button
            type="button"
            onClick={() => onCambiarPestana && onCambiarPestana('tests')}
            className="px-4 py-2 rounded-xl text-xs sm:text-sm font-medium tracking-wide text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 transition-colors cursor-pointer select-none"
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
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-8 py-8 md:py-10">
        
        {/* TÍTULO Y BADGE DE ESTADO */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              One step further, at your pace.
            </h1>
            <p className="text-slate-400 mt-2 text-sm sm:text-base">
              Your wellness is also part of the mission.
            </p>
          </div>

          <div className="bg-[#0e2a24]/90 text-emerald-400 border border-emerald-500/30 px-4 py-2 rounded-full text-xs sm:text-sm font-medium flex items-center gap-2.5 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse"></span>
            <span>All systems nominal on board</span>
          </div>
        </div>

        {/* GRID PRINCIPAL DE 2 COLUMNAS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          {/* COLUMNA IZQUIERDA: TARJETA "CADA PASO CUENTA" */}
          <div className="bg-[#131d2e] border border-slate-800/90 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl">
            {/* Header de la tarjeta con porcentaje */}
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
                  Every step counts
                </h2>
                <p className="text-slate-400 text-xs sm:text-sm mt-1">
                  Your wellness journey today
                </p>
              </div>
              <div className="text-3xl sm:text-4xl font-black text-[#34d399] font-mono">
                {progreso}%
              </div>
            </div>

            {/* Ilustración del Astronauta caminando en la Luna desde public/avatar.svg */}
            <div className="my-6 rounded-2xl overflow-hidden bg-[#1e293b]/70 border border-slate-700/50 flex items-center justify-center p-2">
              <img
                src="/avatar.svg"
                alt="Astronaut on the Moon"
                className="w-full h-auto max-h-60 object-contain rounded-xl select-none pointer-events-none"
              />
            </div>

            {/* Barra de Progreso y Meta diaria */}
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-slate-400">of daily goal</span>
                <span className="text-[#34d399] font-semibold">
                  {progreso >= 75 ? "You're on track" : 'Logging day...'}
                </span>
              </div>

              {/* Barra horizontal */}
              <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#34d399] rounded-full transition-all duration-700 ease-out shadow-[0_0_10px_rgba(52,211,153,0.5)]"
                  style={{ width: `${progreso}%` }}
                ></div>
              </div>

              {/* Sub-etiquetas de inicio y meta */}
              <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2 font-mono">
                <span>Start of day</span>
                <span>Daily goal</span>
              </div>
            </div>
          </div>

          {/* COLUMNA DERECHA: ACTIVIDAD DIARIA + CARD "ESTÁS CUIDANDO DE TI" */}
          <div className="flex flex-col gap-6">
            
            {/* TARJETA DE ACTIVIDAD DIARIA CON SOLAPAS DESPLEGABLES */}
            <div className="bg-[#131d2e] border border-slate-800/90 rounded-3xl p-6 sm:p-8 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
                  Daily Activity
                </h2>
                <span className="bg-slate-800/80 text-slate-400 text-xs px-3.5 py-1 rounded-full border border-slate-700/60 font-medium">
                  Hours per day
                </span>
              </div>

              {/* LISTA DE ACTIVIDADES CON DROPDOWNS INTERACTIVOS */}
              <div className="space-y-4">
                
                {/* 1. HORAS DE MANEJO DE ROVER */}
                <div className="relative">
                  <div className="flex items-center justify-between py-2 border-b border-slate-800/60">
                    <span className="text-slate-300 text-sm sm:text-base font-normal">
                      Rover driving hours.
                    </span>

                    {/* Botón desplegable */}
                    <button
                      type="button"
                      onClick={() => toggleSolapa('rover')}
                      className={`min-w-[120px] px-4 py-2 rounded-xl text-xs sm:text-sm font-medium flex items-center justify-between gap-3 transition-all cursor-pointer ${
                        solapaAbierta === 'rover'
                          ? 'bg-slate-900 border border-emerald-500/70 text-slate-100 shadow-[0_0_10px_rgba(52,211,153,0.2)]'
                          : 'bg-slate-900/80 border border-slate-700/80 text-slate-200 hover:border-slate-600'
                      }`}
                    >
                      <span>{manejoRover}</span>
                      <svg
                        className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                          solapaAbierta === 'rover' ? 'rotate-180 text-emerald-400' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>

                  {/* Solapa desplegable abierta */}
                  {solapaAbierta === 'rover' && (
                    <div className="absolute right-0 top-14 z-30 w-40 bg-[#162238] border border-slate-700 rounded-2xl p-1.5 shadow-2xl backdrop-blur-md animate-fadeIn">
                      {OPCIONES_HORAS.map((opcion) => (
                        <button
                          key={opcion}
                          type="button"
                          onClick={() => seleccionarOpcion('rover', opcion)}
                          className={`w-full px-3.5 py-2 rounded-xl text-xs sm:text-sm text-left flex items-center justify-between transition-colors cursor-pointer ${
                            manejoRover === opcion
                              ? 'bg-emerald-950/80 text-emerald-300 font-semibold border border-emerald-500/30'
                              : 'text-slate-300 hover:bg-slate-800/80'
                          }`}
                        >
                          <span>{opcion}</span>
                          {manejoRover === opcion && (
                            <span className="text-emerald-400 font-bold">✓</span>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* 2. HORAS DE CAMINATA LUNAR (EVA) */}
                <div className="relative">
                  <div className="flex items-center justify-between py-2 border-b border-slate-800/60">
                    <span className="text-slate-300 text-sm sm:text-base font-normal">
                      Lunar EVA walk hours.
                    </span>

                    <button
                      type="button"
                      onClick={() => toggleSolapa('eva')}
                      className={`min-w-[120px] px-4 py-2 rounded-xl text-xs sm:text-sm font-medium flex items-center justify-between gap-3 transition-all cursor-pointer ${
                        solapaAbierta === 'eva'
                          ? 'bg-slate-900 border border-emerald-500/70 text-slate-100 shadow-[0_0_10px_rgba(52,211,153,0.2)]'
                          : 'bg-slate-900/80 border border-slate-700/80 text-slate-200 hover:border-slate-600'
                      }`}
                    >
                      <span>{caminataEVA}</span>
                      <svg
                        className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                          solapaAbierta === 'eva' ? 'rotate-180 text-emerald-400' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>

                  {solapaAbierta === 'eva' && (
                    <div className="absolute right-0 top-14 z-30 w-40 bg-[#162238] border border-slate-700 rounded-2xl p-1.5 shadow-2xl backdrop-blur-md animate-fadeIn">
                      {OPCIONES_HORAS.map((opcion) => (
                        <button
                          key={opcion}
                          type="button"
                          onClick={() => seleccionarOpcion('eva', opcion)}
                          className={`w-full px-3.5 py-2 rounded-xl text-xs sm:text-sm text-left flex items-center justify-between transition-colors cursor-pointer ${
                            caminataEVA === opcion
                              ? 'bg-emerald-950/80 text-emerald-300 font-semibold border border-emerald-500/30'
                              : 'text-slate-300 hover:bg-slate-800/80'
                          }`}
                        >
                          <span>{opcion}</span>
                          {caminataEVA === opcion && (
                            <span className="text-emerald-400 font-bold">✓</span>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* 3. HORAS DE EJERCICIO DE RESISTENCIA */}
                <div className="relative">
                  <div className="flex items-center justify-between py-2">
                    <span className="text-slate-300 text-sm sm:text-base font-normal">
                      Resistance exercise hours.
                    </span>

                    <button
                      type="button"
                      onClick={() => toggleSolapa('resistencia')}
                      className={`min-w-[120px] px-4 py-2 rounded-xl text-xs sm:text-sm font-medium flex items-center justify-between gap-3 transition-all cursor-pointer ${
                        solapaAbierta === 'resistencia'
                          ? 'bg-slate-900 border border-emerald-500/70 text-slate-100 shadow-[0_0_10px_rgba(52,211,153,0.2)]'
                          : 'bg-slate-900/80 border border-slate-700/80 text-slate-200 hover:border-slate-600'
                      }`}
                    >
                      <span>{ejercicioResistencia}</span>
                      <svg
                        className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                          solapaAbierta === 'resistencia' ? 'rotate-180 text-emerald-400' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>

                  {solapaAbierta === 'resistencia' && (
                    <div className="absolute right-0 top-14 z-30 w-40 bg-[#162238] border border-slate-700 rounded-2xl p-1.5 shadow-2xl backdrop-blur-md animate-fadeIn">
                      {OPCIONES_HORAS.map((opcion) => (
                        <button
                          key={opcion}
                          type="button"
                          onClick={() => seleccionarOpcion('resistencia', opcion)}
                          className={`w-full px-3.5 py-2 rounded-xl text-xs sm:text-sm text-left flex items-center justify-between transition-colors cursor-pointer ${
                            ejercicioResistencia === opcion
                              ? 'bg-emerald-950/80 text-emerald-300 font-semibold border border-emerald-500/30'
                              : 'text-slate-300 hover:bg-slate-800/80'
                          }`}
                        >
                          <span>{opcion}</span>
                          {ejercicioResistencia === opcion && (
                            <span className="text-emerald-400 font-bold">✓</span>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

              </div>
            </div>

            {/* TARJETA INFERIOR: ESTÁS CUIDANDO DE TI */}
            <div className="bg-[#131d2e] border border-slate-800/90 rounded-3xl p-6 sm:p-7 shadow-2xl flex items-stretch gap-5">
              {/* Barra vertical de acento cyan */}
              <div className="w-1.5 bg-[#38bdf8] rounded-full self-stretch min-h-[50px] flex-shrink-0 shadow-[0_0_8px_rgba(56,189,248,0.5)]"></div>

              {/* Mensaje de cuidado */}
              <div>
                <span className="text-[#38bdf8] text-xs font-bold tracking-wider uppercase block">
                  TAKING CARE OF YOURSELF
                </span>
                <p className="text-slate-100 text-base sm:text-lg font-medium leading-snug mt-2">
                  {getMensajeCuidado()}
                </p>
              </div>
            </div>

            {/* ACCESO RÁPIDO A EVALUACIONES DE BIENESTAR (PANAS Y SUEÑO) */}
            <div className="bg-[#131d2e] border border-emerald-500/30 rounded-3xl p-6 sm:p-7 shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-[#2ee59d] text-xs font-bold tracking-wider uppercase block">
                  WELLNESS & EVALUATION
                </span>
                <p className="text-slate-200 text-sm sm:text-base font-medium mt-1">
                  Log your emotional state (PANAS) and the quality of your pre-rover rest.
                </p>
              </div>
              <button
                type="button"
                onClick={() => onCambiarPestana && onCambiarPestana('tests')}
                className="bg-[#2ee59d] hover:bg-[#3df2aa] text-[#062018] font-bold text-xs sm:text-sm py-3 px-6 rounded-full shadow-[0_0_20px_rgba(46,229,157,0.25)] transition-all cursor-pointer whitespace-nowrap"
              >
                Go to Evaluations →
              </button>
            </div>

          </div>

        </div>

      </main>

      {/* FOOTER INFERIOR */}
      <footer className="px-6 sm:px-10 py-5 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 bg-[#0a0f1c]/70">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span>Data synced · 14:32</span>
        </div>
        <div className="italic text-slate-400">
          Breathe. Your pace matters too.
        </div>
      </footer>

    </div>
  );
}

