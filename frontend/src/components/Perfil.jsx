import React, { useState } from 'react';

export default function Perfil({ onIniciarSesion }) {
  // Estado local para perfiles
  const [perfilSeleccionado, setPerfilSeleccionado] = useState('grace');
  const [notificacionNFC, setNotificacionNFC] = useState('');
  const [mostrarModalTelemetria, setMostrarModalTelemetria] = useState(false);

  // Estados interactivos para badges
  const [metaGrace, setMetaGrace] = useState(80);
  const [checkRocky, setCheckRocky] = useState(false);

  // Checkboxes de simulación de telemetría
  const [sensores, setSensores] = useState({
    orina: true,
    pvc: true,
    qus: true,
    gravedad: true,
  });

  const tripulantes = [
    {
      id: 'grace',
      nombre: 'Grace K. Wilson',
      cargo: 'Commander',
      cargoColor: 'text-cyan-400',
      badge: `Daily goal: ${metaGrace}%`,
      badgeColor: 'bg-[#0a2723] text-emerald-400 border-emerald-500/30',
      dotColor: 'bg-emerald-400',
      onBadgeClick: () => setMetaGrace((prev) => (prev >= 100 ? 60 : prev + 10)),
    },
    {
      id: 'rocky',
      nombre: 'Rocky C. Mendoza',
      cargo: 'Pilot',
      cargoColor: 'text-sky-400',
      badge: checkRocky ? 'Weekly check completed ✓' : 'Pending weekly check',
      badgeColor: checkRocky
        ? 'bg-[#0a2723] text-emerald-400 border-emerald-500/30'
        : 'bg-[#292011] text-amber-400 border-amber-500/30',
      dotColor: checkRocky ? 'bg-emerald-400' : 'bg-amber-400',
      onBadgeClick: () => setCheckRocky((prev) => !prev),
    },
  ];

  const handleIngresar = (tripulanteId) => {
    setPerfilSeleccionado(tripulanteId);
    const nombre = tripulanteId === 'grace' ? 'Grace K. Wilson' : 'Rocky C. Mendoza';
    setNotificacionNFC(`Authenticating credential for ${nombre}...`);
    
    setTimeout(() => {
      setNotificacionNFC('');
      if (onIniciarSesion) {
        onIniciarSesion(tripulanteId);
      }
    }, 700);
  };

  const simularNFC = () => {
    const alternar = perfilSeleccionado === 'grace' ? 'rocky' : 'grace';
    const nombre = alternar === 'grace' ? 'Grace K. Wilson' : 'Rocky C. Mendoza';
    setNotificacionNFC(`🛰️ NFC card detected: Accessing as ${nombre}...`);
    
    setTimeout(() => {
      setPerfilSeleccionado(alternar);
      if (onIniciarSesion) {
        onIniciarSesion(alternar);
      }
    }, 900);
  };

  const toggleSensor = (clave) => {
    setSensores((prev) => ({ ...prev, [clave]: !prev[clave] }));
  };

  return (
    <div className="min-h-screen bg-[#0b1220] text-slate-100 flex flex-col justify-between font-sans selection:bg-cyan-500 selection:text-slate-900 relative">
      
      {/* HEADER SUPERIOR SIN NAVBAR (SOLO INFORMACIÓN DE MISIÓN) */}
      <header className="px-6 sm:px-10 py-5 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs md:text-sm font-mono tracking-wider text-slate-400">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-200 tracking-wider">LUNAR ROVER</span>
          <span className="text-cyan-400 font-bold mx-1">//</span>
          <span className="text-slate-300">MISSION DAY 42</span>
        </div>

        {/* Indicador de sistemas en línea */}
        <div className="flex items-center gap-2">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399] animate-pulse"></span>
          <span className="text-slate-300 font-medium">Nominal Systems • 1/6 G • Online</span>
        </div>
      </header>

      {/* CONTENIDO CENTRAL */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8 md:py-14 max-w-6xl mx-auto w-full">
        
        {/* Banner de notificación interactivo para NFC */}
        {notificacionNFC && (
          <div className="mb-6 px-5 py-2.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs md:text-sm font-medium animate-fadeIn flex items-center gap-2.5 shadow-lg shadow-cyan-950/50">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
            <span>{notificacionNFC}</span>
          </div>
        )}

        {/* Título y subtítulo */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Select your profile to begin
          </h1>
          <p className="text-slate-400 mt-3 text-sm sm:text-base font-normal">
            Your health metrics are private and automatically synchronized
          </p>
        </div>

        {/* TARJETAS DE LOS DOS TRIPULANTES */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 w-full max-w-3xl">
          {tripulantes.map((tripulante) => {
            const esActivo = perfilSeleccionado === tripulante.id;
            return (
              <div
                key={tripulante.id}
                onClick={() => setPerfilSeleccionado(tripulante.id)}
                className={`bg-[#131d2e] border rounded-3xl p-8 sm:p-10 flex flex-col items-center justify-between text-center transition-all duration-300 relative cursor-pointer group shadow-2xl ${
                  esActivo
                    ? 'border-emerald-500/60 ring-2 ring-emerald-400/40 shadow-[0_0_35px_rgba(16,185,129,0.18)] scale-[1.01]'
                    : 'border-slate-800/90 hover:border-slate-700 hover:bg-[#162236]'
                }`}
              >
                {/* Imagen del tripulante desde la carpeta public (Avatar ilustrado) */}
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden mb-5 bg-[#1b253b] ring-4 ring-slate-800/80 shadow-inner flex items-center justify-center transition-transform group-hover:scale-105">
                  <img
                    src="/Avatar ilustrado · Rocky C. Mendoza.svg"
                    alt={`Avatar of ${tripulante.nombre}`}
                    className="w-full h-full object-cover select-none pointer-events-none"
                    onError={(e) => {
                      // Fallback en caso de incompatibilidad con espacios en URL
                      e.currentTarget.src = '/avatar-ilustrado.svg';
                    }}
                  />
                </div>

                {/* Nombre y Cargo */}
                <h2 className="text-2xl font-bold text-white tracking-wide">
                  {tripulante.nombre}
                </h2>
                <p className={`${tripulante.cargoColor} text-sm font-semibold mt-1`}>
                  {tripulante.cargo}
                </p>

                {/* Badge de estado */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    tripulante.onBadgeClick();
                  }}
                  title="Click to toggle status"
                  className={`mt-4 border text-xs px-4 py-1.5 rounded-full flex items-center gap-2 font-medium transition-colors cursor-pointer select-none ${tripulante.badgeColor}`}
                >
                  <span className={`w-2 h-2 rounded-full ${tripulante.dotColor} animate-pulse`}></span>
                  <span>{tripulante.badge}</span>
                </button>

                {/* Botón Ingresar */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleIngresar(tripulante.id);
                  }}
                  className="w-full mt-7 bg-[#10b981] hover:bg-[#34d399] active:bg-[#059669] text-[#062018] font-bold text-base py-3 px-6 rounded-xl flex items-center justify-center gap-2.5 transition-all duration-200 transform group-hover:shadow-[0_0_20px_rgba(16,185,129,0.35)] cursor-pointer"
                >
                  <span>Enter</span>
                  <svg
                    className="w-5 h-5 transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>
                </button>
              </div>
            );
          })}
        </div>

      </main>

      {/* FOOTER INFERIOR EXACTAMENTE COMO SE VE EN LA IMAGEN */}
      <footer className="px-6 sm:px-10 py-5 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs md:text-sm text-slate-400 bg-[#0a0f1c]/70">
        
        {/* Lado izquierdo: NFC Contactless */}
        <div
          onClick={simularNFC}
          className="flex items-center gap-3 cursor-pointer group hover:text-slate-200 transition-colors select-none"
          title="Tap to simulate NFC card access"
        >
          <div className="w-8 h-8 rounded-lg bg-sky-950/60 border border-sky-500/30 flex items-center justify-center text-sky-400 group-hover:border-sky-400 group-hover:shadow-[0_0_12px_rgba(56,189,248,0.3)] transition-all">
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="2" y="5" width="20" height="14" rx="2" />
              <line x1="2" y1="10" x2="22" y2="10" />
              <path d="M6 15h2" strokeLinecap="round" />
              <path d="M17 14c.6.6.6 1.4 0 2" strokeLinecap="round" />
              <path d="M19 12c1.7 1.7 1.7 4.3 0 6" strokeLinecap="round" />
            </svg>
          </div>
          <span className="font-normal text-slate-300 group-hover:text-cyan-300 transition-colors">
            Hold your NFC credential or tap your card to access
          </span>
        </div>

        {/* Lado derecho: Botón Simular Telemetría */}
        <button
          type="button"
          onClick={() => setMostrarModalTelemetria(true)}
          className="border border-slate-700/80 bg-slate-900/80 hover:bg-slate-800 hover:border-slate-600 active:scale-95 text-slate-300 hover:text-white px-5 py-2.5 rounded-xl text-xs md:text-sm font-medium flex items-center gap-2.5 transition-all cursor-pointer shadow-md"
        >
          <svg
            className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 transition-colors"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <circle cx="12" cy="12" r="3" />
          </svg>
          <span>Simulate Telemetry</span>
        </button>
      </footer>

      {/* MODAL DE SIMULACIÓN DE TELEMETRÍA */}
      {mostrarModalTelemetria && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#131d2e] border border-slate-700 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white">Rover Sensor Simulator</h3>
              <button
                type="button"
                onClick={() => setMostrarModalTelemetria(false)}
                className="text-slate-400 hover:text-white p-2 rounded-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="mt-6 space-y-3 text-xs">
              <label className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/40 border border-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={sensores.orina}
                  onChange={() => toggleSensor('orina')}
                  className="w-4 h-4 rounded text-emerald-500 accent-emerald-500"
                />
                <span className="text-slate-200">Urine Test Strip Sensor (Biomarkers)</span>
              </label>

              <label className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/40 border border-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={sensores.pvc}
                  onChange={() => toggleSensor('pvc')}
                  className="w-4 h-4 rounded text-sky-500 accent-sky-500"
                />
                <span className="text-slate-200">CVP Test Sensor (Hemodynamics)</span>
              </label>

              <label className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/40 border border-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={sensores.qus}
                  onChange={() => toggleSensor('qus')}
                  className="w-4 h-4 rounded text-cyan-500 accent-cyan-500"
                />
                <span className="text-slate-200">QUS Test Sensor (Calcaneus Ultrasound)</span>
              </label>

              <label className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/40 border border-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={sensores.gravedad}
                  onChange={() => toggleSensor('gravedad')}
                  className="w-4 h-4 rounded text-teal-500 accent-teal-500"
                />
                <span className="text-slate-200">Cabin Accelerometer (1/6 G)</span>
              </label>
            </div>

            <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setMostrarModalTelemetria(false)}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

