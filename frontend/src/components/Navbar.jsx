import React from 'react';
import { GraceAvatar, RockyAvatar } from './AstronautAvatars';

const PESTAÑAS = [
  { id: 'inicio', label: 'Home', icon: '🚀' },
  { id: 'tests', label: 'Wellness & Tests', icon: '🧠' },
  { id: 'test_orina', label: 'Urine Test', icon: '🧪' },
  { id: 'test_pvc', label: 'CVP Test', icon: '🫀' },
  { id: 'test_qus', label: 'QUS Test', icon: '🦴' },
];

export default function Navbar({
  pestanaActiva = 'inicio',
  setPestanaActiva,
  perfilActivo = 'grace',
  setPerfilActivo,
}) {
  return (
    <header className="w-full bg-[#0a0f1c]/95 border-b border-slate-800/80 backdrop-blur-md sticky top-0 z-40 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          
          {/* LADO IZQUIERDO: LUNAR ROVER // MISSION DAY 42 */}
          <div className="flex items-center gap-2 text-xs md:text-sm font-mono tracking-wider">
            <button
              type="button"
              onClick={() => setPestanaActiva && setPestanaActiva('inicio')}
              className="flex items-center gap-2 text-left cursor-pointer group focus:outline-none"
            >
              <span className="font-bold text-slate-200 group-hover:text-white transition-colors">
                LUNAR ROVER
              </span>
              <span className="text-cyan-400 font-bold mx-1">//</span>
              <span className="text-slate-300 font-normal">
                DAY 42
              </span>
            </button>
          </div>

          {/* NAVBAR CENTRAL: Home / Urine Test / CVP Test / QUS Test */}
          <nav className="flex items-center gap-1 sm:gap-2 bg-slate-900/80 border border-slate-800/90 rounded-2xl p-1 shadow-inner">
            {PESTAÑAS.map((pestana) => {
              const estaActiva = pestanaActiva === pestana.id;
              return (
                <button
                  key={pestana.id}
                  type="button"
                  onClick={() => setPestanaActiva && setPestanaActiva(pestana.id)}
                  className={`px-3 sm:px-4 py-1.5 rounded-xl text-xs sm:text-sm font-medium tracking-wide transition-all duration-200 flex items-center gap-1.5 whitespace-nowrap cursor-pointer select-none ${
                    estaActiva
                      ? 'bg-slate-800 text-cyan-300 border border-cyan-500/40 shadow-[0_0_15px_rgba(34,211,238,0.2)] font-semibold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 border border-transparent'
                  }`}
                >
                  <span className="text-xs">{pestana.icon}</span>
                  <span>{pestana.label}</span>
                </button>
              );
            })}
          </nav>

          {/* LADO DERECHO: SELECTOR DE PERFIL RÁPIDO & SISTEMAS NOMINALES */}
          <div className="flex items-center gap-3">
            {setPerfilActivo && (
              <div className="flex items-center bg-slate-900/90 border border-slate-800 rounded-xl p-1 gap-1">
                <button
                  type="button"
                  onClick={() => setPerfilActivo('grace')}
                  title="Select Grace K. Wilson"
                  className={`flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs transition-all cursor-pointer ${
                    perfilActivo === 'grace'
                      ? 'bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="w-4 h-4 rounded-full overflow-hidden flex-shrink-0">
                    <GraceAvatar className="w-full h-full" />
                  </div>
                  <span className="hidden xl:inline text-[11px]">Grace</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPerfilActivo('rocky')}
                  title="Select Rocky C. Mendoza"
                  className={`flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs transition-all cursor-pointer ${
                    perfilActivo === 'rocky'
                      ? 'bg-sky-500/20 text-sky-300 font-semibold border border-sky-500/30'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="w-4 h-4 rounded-full overflow-hidden flex-shrink-0">
                    <RockyAvatar className="w-full h-full" />
                  </div>
                  <span className="hidden xl:inline text-[11px]">Rocky</span>
                </button>
              </div>
            )}

            {/* Systems Nominal • 1/6 G • Online */}
            <div className="flex items-center gap-2 text-xs text-slate-300 font-mono tracking-wide">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399] animate-pulse"></span>
              <span className="hidden sm:inline">1/6 G • Online</span>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}
