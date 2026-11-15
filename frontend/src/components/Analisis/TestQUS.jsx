import React, { useState } from 'react';
import { GraceAvatar, RockyAvatar } from '../AstronautAvatars';

export default function TestQUS({ perfilActivo = 'grace', onVolver }) {
  const [bua, setBua] = useState(perfilActivo === 'grace' ? 116 : 98); // dB/MHz
  const [sos, setSos] = useState(perfilActivo === 'grace' ? 1552 : 1515); // m/s
  const [tScore, setTScore] = useState(perfilActivo === 'grace' ? -0.2 : -0.8);
  const [escaneando, setEscaneando] = useState(false);

  // Checkboxes interactivos
  const [calibracionGel, setCalibracionGel] = useState(true);
  const [analisisCalcaneo, setAnalisisCalcaneo] = useState(true);
  const [seguimientoHistorico, setSeguimientoHistorico] = useState(true);
  const [alertaImpacto, setAlertaImpacto] = useState(perfilActivo === 'rocky');

  const astronauta = perfilActivo === 'grace'
    ? { nombre: 'Grace K. Wilson', rango: 'Comandante', avatar: <GraceAvatar className="w-12 h-12" /> }
    : { nombre: 'Rocky C. Mendoza', rango: 'Piloto', avatar: <RockyAvatar className="w-12 h-12" /> };

  const ejecutarEscaneo = () => {
    setEscaneando(true);
    setTimeout(() => {
      setEscaneando(false);
      setBua((prev) => prev + 2);
      setSos((prev) => prev + 5);
      setTScore((prev) => Math.min(0.2, Number((prev + 0.1).toFixed(1))));
    }, 1400);
  };

  return (
    <div className="min-h-full bg-[#0b1220] text-slate-100 p-4 sm:p-8 max-w-6xl mx-auto">
      {/* Cabecera */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-widest">
            <span>BioAstro Osteología</span>
            <span>//</span>
            <span>Ultrasonometría Cuantitativa</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Test QUS (Ultrasonido de Calcáneo)
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Evaluación no invasiva de microarquitectura y densidad mineral ósea lunar
          </p>
        </div>

        <div className="flex items-center gap-3 bg-[#131d2e] border border-slate-700/80 rounded-2xl p-2.5 px-4 shadow-lg">
          <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-slate-800">
            {astronauta.avatar}
          </div>
          <div>
            <div className="text-sm font-bold text-white">{astronauta.nombre}</div>
            <div className="text-xs text-emerald-400 font-medium">{astronauta.rango}</div>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        
        {/* Métricas y Visualización Acústica */}
        <div className="lg:col-span-2 bg-[#131d2e] border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <span>🦴</span> Transmisión Acústica de Calcáneo Bilateral
              </h2>
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-500/30">
                Transductor Lunar QUS-2
              </span>
            </div>

            {/* Gráfico de Ondas Acústicas */}
            <div className="mt-6 p-4 rounded-2xl bg-slate-950 border border-slate-800 h-44 flex flex-col justify-between relative overflow-hidden">
              <div className="text-xs font-mono text-slate-400">
                Atenuación Acústica de Banda Ancha (BUA) vs Velocidad del Sonido (SOS)
              </div>

              {/* Curvas de ultrasonido */}
              <svg className="w-full h-28 text-emerald-400" viewBox="0 0 500 100" preserveAspectRatio="none">
                <path
                  d="M0,80 Q70,75 140,50 T280,25 T400,60 T500,45"
                  fill="none"
                  stroke="#34d399"
                  strokeWidth="3"
                />
                <path
                  d="M0,90 Q80,85 160,65 T300,40 T420,70 T500,55"
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />
              </svg>

              <div className="flex justify-between text-[11px] font-mono text-slate-500">
                <span>0.2 MHz</span>
                <span>0.5 MHz (Frecuencia Central)</span>
                <span>0.8 MHz</span>
              </div>
            </div>

            {/* Métricas clave */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
                <span className="text-xs text-slate-400">BUA (Atenuación)</span>
                <div className="text-2xl font-black text-white mt-1">{bua} dB/MHz</div>
                <span className="text-[11px] text-emerald-400 font-medium">Trabecular denso</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
                <span className="text-xs text-slate-400">SOS (Velocidad)</span>
                <div className="text-2xl font-black text-white mt-1">{sos} m/s</div>
                <span className="text-[11px] text-sky-400 font-medium">Elasticidad ósea óptima</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
                <span className="text-xs text-slate-400">T-Score Estimado</span>
                <div className="text-2xl font-black text-white mt-1">{tScore}</div>
                <span className={`text-[11px] font-medium ${tScore >= -0.5 ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {tScore >= -0.5 ? 'Sin osteopenia' : 'Alerta de resorción leve'}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              type="button"
              disabled={escaneando}
              onClick={ejecutarEscaneo}
              className="bg-[#10b981] hover:bg-[#34d399] active:bg-[#059669] text-[#062018] font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm cursor-pointer shadow-lg shadow-emerald-500/20 disabled:opacity-50"
            >
              {escaneando ? 'Transmitiendo ultrasonido...' : '⚡ Iniciar Escaneo QUS de Talón'}
            </button>

            {onVolver && (
              <button
                type="button"
                onClick={onVolver}
                className="text-xs text-slate-400 hover:text-white underline cursor-pointer ml-auto"
              >
                ← Volver a Inicio
              </button>
            )}
          </div>
        </div>

        {/* Panel lateral con checkboxes interactivos */}
        <div className="bg-[#131d2e] border border-slate-700/80 rounded-3xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-white mb-2">Protocolo de Ultrasonido</h3>
            <p className="text-xs text-slate-400 mb-6">
              Control de absorción mecánica y bandas de resistencia
            </p>

            <div className="space-y-4">
              <label className="flex items-center gap-2.5 text-xs text-slate-300 hover:text-white cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={calibracionGel}
                  onChange={(e) => setCalibracionGel(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-700 bg-slate-800 text-emerald-500 accent-emerald-500 cursor-pointer"
                />
                <span>Acoplamiento acústico (Gel de contacto)</span>
              </label>

              <label className="flex items-center gap-2.5 text-xs text-slate-300 hover:text-white cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={analisisCalcaneo}
                  onChange={(e) => setAnalisisCalcaneo(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-700 bg-slate-800 text-emerald-500 accent-emerald-500 cursor-pointer"
                />
                <span>Cálculo de índice de rigidez (Stiffness Index)</span>
              </label>

              <label className="flex items-center gap-2.5 text-xs text-slate-300 hover:text-white cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={seguimientoHistorico}
                  onChange={(e) => setSeguimientoHistorico(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-700 bg-slate-800 text-emerald-500 accent-emerald-500 cursor-pointer"
                />
                <span>Sincronizar telemetría ósea con NASA / ESA</span>
              </label>

              <label className="flex items-center gap-2.5 text-xs text-slate-300 hover:text-white cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={alertaImpacto}
                  onChange={(e) => setAlertaImpacto(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-700 bg-slate-800 text-amber-500 accent-amber-500 cursor-pointer"
                />
                <span>Exigir 20 min de marcha con bandas elásticas</span>
              </label>
            </div>

            <div className="mt-8 p-4 rounded-2xl bg-[#09221c] border border-emerald-500/30 text-xs text-slate-300">
              <span className="font-bold text-emerald-400 block mb-1">Prescripción de Ejercicio:</span>
              El impacto mecánico al caminar en la Luna (1/6 G) no basta por sí solo para mantener la densidad trabecular. Realizar saltos controlados contra arnés reactivo.
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

