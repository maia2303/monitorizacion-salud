import React, { useState } from 'react';
import { GraceAvatar, RockyAvatar } from '../AstronautAvatars';

export default function TestPVC({ perfilActivo = 'grace', onVolver, onCambiarPestana }) {
  const [presionPVC, setPresionPVC] = useState(perfilActivo === 'grace' ? 4.8 : 6.2); // mmHg
  const frecuenciaCardiaca = perfilActivo === 'grace' ? 64 : 72; // bpm
  const [calibrado, setCalibrado] = useState(true);

  // Checkboxes interactivos
  const [compensacionGravedad, setCompensacionGravedad] = useState(true);
  const [filtroOndaVenosa, setFiltroOndaVenosa] = useState(true);
  const [sensorTranscutaneo, setSensorTranscutaneo] = useState(true);
  const [alertaSobrecarga, setAlertaSobrecarga] = useState(false);

  const astronauta = perfilActivo === 'grace'
    ? { nombre: 'Grace K. Wilson', rango: 'Commander', avatar: <GraceAvatar className="w-12 h-12" /> }
    : { nombre: 'Rocky C. Mendoza', rango: 'Pilot', avatar: <RockyAvatar className="w-12 h-12" /> };

  const recalibrar = () => {
    setCalibrado(false);
    setTimeout(() => {
      setCalibrado(true);
      setPresionPVC(perfilActivo === 'grace' ? 4.5 : 5.8);
    }, 1000);
  };

  return (
    <div className="w-full bg-[#0b1220] text-slate-100 flex flex-col justify-between font-sans selection:bg-cyan-500 selection:text-slate-900 min-h-screen">
      {/* HEADER SUPERIOR UNIFICADO */}
      <header className="px-6 sm:px-10 py-5 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs md:text-sm font-mono tracking-wider">
            <span className="font-bold text-slate-200">LUNAR ROVER</span>
            <span className="text-cyan-400 font-bold mx-1">//</span>
            <span className="text-slate-300 font-normal">MISSION DAY 42</span>
          </div>
          <div className="text-xs text-slate-400 mt-1">
            {astronauta.nombre} · Crew A
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
            onClick={() => onCambiarPestana && onCambiarPestana('tests')}
            className="px-4 py-2 rounded-xl text-xs sm:text-sm font-medium tracking-wide text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 transition-colors cursor-pointer select-none"
          >
            Wellbeing & Tests
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
            className="px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold tracking-wide bg-[#0d342f] text-[#34d399] border border-emerald-500/30 shadow-[0_0_15px_rgba(52,211,153,0.15)] cursor-pointer select-none"
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

      <div className="flex-1 p-4 sm:p-8 max-w-6xl w-full mx-auto">
        {/* Cabecera */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-sky-400 uppercase tracking-widest">
            <span>BioAstro Cardiovascular</span>
            <span>//</span>
            <span>Hemodynamic Telemetry</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            CVP Test (Central Venous Pressure)
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Continuous monitoring of cardiac preload and fluid redistribution in 1/6 G
          </p>
        </div>

        <div className="flex items-center gap-3 bg-[#131d2e] border border-slate-700/80 rounded-2xl p-2.5 px-4 shadow-lg">
          <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-slate-800">
            {astronauta.avatar}
          </div>
          <div>
            <div className="text-sm font-bold text-white">{astronauta.nombre}</div>
            <div className="text-xs text-sky-400 font-medium">{astronauta.rango}</div>
          </div>
        </div>
      </div>

      {/* Grid de contenido */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        
        {/* Onda Venosa y Monitor */}
        <div className="lg:col-span-2 bg-[#131d2e] border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <span>🫀</span> Jugular Venous Wave / Right Atrium Monitor
              </h2>
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-500/30">
                ● Live (1/6 G)
              </span>
            </div>

            {/* Simulación visual de onda cardíaca PVC */}
            <div className="mt-6 p-4 rounded-2xl bg-slate-950 border border-slate-800 h-44 flex items-center justify-center relative overflow-hidden">
              <svg className="w-full h-full text-cyan-400 opacity-90" viewBox="0 0 500 120" preserveAspectRatio="none">
                <path
                  d="M0,60 Q25,30 50,60 T100,60 T150,20 T200,90 T250,55 T300,60 T350,30 T400,60 T450,20 T500,60"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute top-3 left-4 text-xs font-mono text-slate-400">
                a, c, v waves • Physiological cephalic fluid shift
              </div>
            </div>

            {/* Métricas clave */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6">
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
                <span className="text-xs text-slate-400">CVP Pressure</span>
                <div className="text-2xl font-black text-white mt-1">{presionPVC.toFixed(1)} mmHg</div>
                <span className="text-[11px] text-emerald-400 font-medium">Adapted normal</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
                <span className="text-xs text-slate-400">Heart Rate</span>
                <div className="text-2xl font-black text-white mt-1">{frecuenciaCardiaca} bpm</div>
                <span className="text-[11px] text-sky-400 font-medium">Regular sinus rhythm</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 col-span-2 sm:col-span-1">
                <span className="text-xs text-slate-400">Stroke Volume</span>
                <div className="text-2xl font-black text-white mt-1">74 ml</div>
                <span className="text-[11px] text-cyan-400 font-medium">Optimal output</span>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={recalibrar}
              className="bg-slate-800 hover:bg-slate-700 text-sky-300 border border-sky-500/30 px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer"
            >
              {calibrado ? '⚡ Recalibrate Pressure Transducer' : 'Calibrating...'}
            </button>
            {onVolver && (
              <button
                type="button"
                onClick={onVolver}
                className="text-xs text-slate-400 hover:text-white underline cursor-pointer ml-auto"
              >
                ← Return to Home
              </button>
            )}
          </div>
        </div>

        {/* Checkboxes de Configuración y Diagnóstico */}
        <div className="bg-[#131d2e] border border-slate-700/80 rounded-3xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-white mb-2">Sensor Parameters</h3>
            <p className="text-xs text-slate-400 mb-6">
              Digital filter against lunar rover motor vibrations
            </p>

            <div className="space-y-4">
              <label className="flex items-center gap-2.5 text-xs text-slate-300 hover:text-white cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={compensacionGravedad}
                  onChange={(e) => setCompensacionGravedad(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-700 bg-slate-800 text-sky-500 accent-sky-500 cursor-pointer"
                />
                <span>1/6 G barometric compensation</span>
              </label>

              <label className="flex items-center gap-2.5 text-xs text-slate-300 hover:text-white cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={filtroOndaVenosa}
                  onChange={(e) => setFiltroOndaVenosa(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-700 bg-slate-800 text-sky-500 accent-sky-500 cursor-pointer"
                />
                <span>Motion artifact filter</span>
              </label>

              <label className="flex items-center gap-2.5 text-xs text-slate-300 hover:text-white cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={sensorTranscutaneo}
                  onChange={(e) => setSensorTranscutaneo(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-700 bg-slate-800 text-sky-500 accent-sky-500 cursor-pointer"
                />
                <span>Non-invasive transcutaneous sensor</span>
              </label>

              <label className="flex items-center gap-2.5 text-xs text-slate-300 hover:text-white cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={alertaSobrecarga}
                  onChange={(e) => setAlertaSobrecarga(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-700 bg-slate-800 text-amber-500 accent-amber-500 cursor-pointer"
                />
                <span>Cephalic venous congestion alert</span>
              </label>
            </div>

            <div className="mt-8 p-4 rounded-2xl bg-[#091b2e] border border-sky-500/30 text-xs text-slate-300">
              <span className="font-bold text-sky-400 block mb-1">Artemis Medical Note:</span>
              Reduced gravity causes fluid redistribution toward the head and chest. Maintaining CVP under 8 mmHg prevents cephalic headaches and facial edema.
            </div>
          </div>
        </div>

      </div>
      </div>
    </div>
  );
}
