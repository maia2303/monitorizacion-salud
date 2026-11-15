import React, { useState } from 'react';

// Escala clínica de colores de tira reactiva para astronautas en gravedad lunar
const COLORES_TIRA = [
  {
    id: 1,
    color: '#fefce8',
    borde: '#fef08a',
    nombre: 'Muy claro / Transparente',
    nivel: '100%',
    densidad: '1.005',
    ph: '7.0',
    estado: 'Hidratación Óptima',
    mensaje: 'Excelente balance de fluidos. Tus riñones están filtrando el calcio de forma fluida.',
    alerta: false,
  },
  {
    id: 2,
    color: '#fef08a',
    borde: '#fde047',
    nombre: 'Amarillo Pálido Pajizo',
    nivel: '90%',
    densidad: '1.012',
    ph: '6.8',
    estado: 'Hidratación Ideal',
    mensaje: 'Nivel recomendado para travesías en el rover y caminatas EVA.',
    alerta: false,
  },
  {
    id: 3,
    color: '#fde047',
    borde: '#eab308',
    nombre: 'Amarillo Claro Normal',
    nivel: '80%',
    densidad: '1.018',
    ph: '6.5',
    estado: 'Hidratación Adecuada',
    mensaje: 'Buen nivel metabólico. Mantener ingesta de 200 ml cada 60 minutos.',
    alerta: false,
  },
  {
    id: 4,
    color: '#eab308',
    borde: '#ca8a04',
    nombre: 'Amarillo Oscuro / Dorado',
    nivel: '65%',
    densidad: '1.022',
    ph: '6.0',
    estado: 'Hidratación Moderada',
    mensaje: 'Comienza una ligera concentración de solutos. Bebe un vaso de agua antes de la próxima tarea.',
    alerta: false,
  },
  {
    id: 5,
    color: '#ca8a04',
    borde: '#a16207',
    nombre: 'Ámbar Claro',
    nivel: '50%',
    densidad: '1.026',
    ph: '5.8',
    estado: 'Deshidratación Leve',
    mensaje: 'Alerta de reabsorción ósea. Tus riñones necesitan 350 ml de agua para disolver el calcio.',
    alerta: true,
  },
  {
    id: 6,
    color: '#a16207',
    borde: '#854d0e',
    nombre: 'Ámbar Intenso',
    nivel: '35%',
    densidad: '1.030',
    ph: '5.5',
    estado: 'Deshidratación Notoria',
    mensaje: 'Se detecta aumento en la densidad de la muestra. Bebe 500 ml de electrolitos inmediatamente.',
    alerta: true,
  },
  {
    id: 7,
    color: '#713f12',
    borde: '#451a03',
    nombre: 'Marrón Ámbar Oscuro',
    nivel: '20%',
    densidad: '1.035',
    ph: '5.2',
    estado: 'Deshidratación Severa',
    mensaje: 'Riesgo inminente de microcristales de calcio. Notifica a soporte médico y suspende la actividad física pesada.',
    alerta: true,
  },
];

export default function ControlOrina({ onVolver, onCambiarPestana }) {
  // El usuario solo tiene que elegir el color que salió en su tira reactiva
  const [colorSeleccionadoId, setColorSeleccionadoId] = useState(2); // Por defecto nivel 2 (ideal)
  const [guardadoExitoso, setGuardadoExitoso] = useState(false);

  const muestraActual = COLORES_TIRA.find((c) => c.id === colorSeleccionadoId) || COLORES_TIRA[1];

  const handleGuardar = () => {
    setGuardadoExitoso(true);
    setTimeout(() => setGuardadoExitoso(false), 2500);
  };

  return (
    <div className="w-full bg-[#0b1220] text-slate-100 flex flex-col justify-between font-sans selection:bg-cyan-500 selection:text-slate-900 min-h-screen">
      
      {/* HEADER SUPERIOR CON NAVBAR INTEGRADO */}
      <header className="px-6 sm:px-10 py-5 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs md:text-sm font-mono tracking-wider">
            <span className="font-bold text-slate-200">ROVER LUNAR</span>
            <span className="text-cyan-400 font-bold mx-1">//</span>
            <span className="text-slate-300 font-normal">DÍA 42</span>
          </div>
          <div className="text-xs text-slate-400 mt-1">
            Test Rápido de Hidratación · Control de Tira Reactiva
          </div>
        </div>

        {/* Pestañas de navegación */}
        <nav className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => onCambiarPestana ? onCambiarPestana('inicio') : onVolver && onVolver()}
            className="px-4 py-2 rounded-xl text-xs sm:text-sm font-medium tracking-wide text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 transition-colors cursor-pointer select-none"
          >
            Inicio
          </button>

          <button
            type="button"
            onClick={() => onCambiarPestana && onCambiarPestana('tests')}
            className="px-4 py-2 rounded-xl text-xs sm:text-sm font-medium tracking-wide text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 transition-colors cursor-pointer select-none"
          >
            Bienestar y Tests
          </button>
          
          <button
            type="button"
            className="px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold tracking-wide bg-[#0d342f] text-[#34d399] border border-emerald-500/30 shadow-[0_0_15px_rgba(52,211,153,0.15)] cursor-pointer select-none"
          >
            Test Orina
          </button>

          <button
            type="button"
            onClick={() => onCambiarPestana && onCambiarPestana('test_pvc')}
            className="px-4 py-2 rounded-xl text-xs sm:text-sm font-medium tracking-wide text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 transition-colors cursor-pointer select-none"
          >
            Test PVC
          </button>

          <button
            type="button"
            onClick={() => onCambiarPestana && onCambiarPestana('test_qus')}
            className="px-4 py-2 rounded-xl text-xs sm:text-sm font-medium tracking-wide text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 transition-colors cursor-pointer select-none"
          >
            Test QUS
          </button>
        </nav>
      </header>

      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-8 py-8 md:py-10">
        
        {/* TÍTULO */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest block mb-1">
            Lectura Rápida de Biomarcador
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Selecciona el color de tu tira reactiva
          </h1>
          <p className="text-slate-400 mt-2 text-sm sm:text-base">
            Compara tu tira de orina con la escala visual para registrar tu hidratación automáticamente.
          </p>
        </div>

        {/* FEEDBACK DE GUARDADO */}
        {guardadoExitoso && (
          <div className="mb-6 max-w-md mx-auto px-4 py-2.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-lg animate-fadeIn">
            <span>✓</span> Muestra sincronizada exitosamente con la telemetría del rover
          </div>
        )}

        {/* SELECTOR DE COLORES DE LA TIRA REACTIVA */}
        <div className="bg-[#131d2e] border border-slate-800/90 rounded-3xl p-6 sm:p-8 shadow-2xl mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span>🧪</span> Escala Cromática Lunar (Toca el color obtenido)
            </h2>
            <span className="text-xs text-slate-400 font-mono">
              7 niveles de hidratación
            </span>
          </div>

          {/* PALETA DE SELECCIÓN DE COLOR */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4 mt-6">
            {COLORES_TIRA.map((muestra) => {
              const seleccionado = muestra.id === colorSeleccionadoId;
              return (
                <button
                  key={muestra.id}
                  type="button"
                  onClick={() => setColorSeleccionadoId(muestra.id)}
                  className={`flex flex-col items-center justify-between p-3.5 rounded-2xl border transition-all duration-200 cursor-pointer group relative ${
                    seleccionado
                      ? 'bg-slate-800/95 border-emerald-400 ring-2 ring-emerald-400/50 shadow-[0_0_20px_rgba(52,211,153,0.3)] scale-105'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-800/50'
                  }`}
                >
                  {/* Círculo con el color de la tira */}
                  <div
                    className="w-12 h-12 rounded-full shadow-inner flex items-center justify-center transition-transform group-hover:scale-110 relative"
                    style={{
                      backgroundColor: muestra.color,
                      border: `3px solid ${muestra.borde}`,
                      boxShadow: seleccionado ? `0 0 16px ${muestra.color}` : 'none',
                    }}
                  >
                    {seleccionado && (
                      <span className="text-slate-900 font-black text-sm drop-shadow">
                        ✓
                      </span>
                    )}
                  </div>

                  {/* Nombre y nivel */}
                  <div className="text-center mt-3">
                    <span className="text-xs font-bold text-white block">
                      Nivel {muestra.id}
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium block truncate max-w-[90px]">
                      {muestra.nombre}
                    </span>
                    <span
                      className={`text-[11px] font-bold mt-1 block ${
                        muestra.alerta ? 'text-amber-400' : 'text-emerald-400'
                      }`}
                    >
                      {muestra.nivel}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* DETALLE Y RESULTADOS AUTOMÁTICOS DEL COLOR ELEGIDO */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          
          {/* Tarjeta de Representación Visual de la Tira */}
          <div className="bg-[#131d2e] border border-slate-800/90 rounded-3xl p-6 sm:p-7 shadow-2xl flex flex-col items-center justify-between text-center">
            <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
              Tu Tira Reactiva
            </span>

            {/* Simulación visual de la tira física */}
            <div className="w-16 h-48 bg-slate-200 rounded-xl my-4 p-2 flex flex-col justify-end shadow-xl border-2 border-slate-400 relative">
              {/* Almohadilla reactiva con el color seleccionado */}
              <div
                className="w-full h-12 rounded-lg transition-colors duration-500 flex items-center justify-center font-bold text-slate-900 text-xs shadow-inner"
                style={{
                  backgroundColor: muestraActual.color,
                  border: `2px solid ${muestraActual.borde}`,
                }}
              >
                {muestraActual.nivel}
              </div>
              <div className="mt-2 text-[10px] text-slate-600 font-mono text-center">
                BIO-STRIP
              </div>
            </div>

            <div className="text-xs text-slate-400">
              Color detectado: <strong className="text-white">{muestraActual.nombre}</strong>
            </div>
          </div>

          {/* Tarjeta de Diagnóstico y Métricas Calculadas */}
          <div className="md:col-span-2 bg-[#131d2e] border border-slate-800/90 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col justify-between">
            <div>
              {/* Encabezado del resultado */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div>
                  <span className="text-xs text-slate-400">Estado de Hidratación</span>
                  <h3 className="text-2xl font-bold text-white mt-0.5">
                    {muestraActual.estado}
                  </h3>
                </div>
                <div
                  className={`text-3xl font-black font-mono ${
                    muestraActual.alerta ? 'text-amber-400' : 'text-emerald-400'
                  }`}
                >
                  {muestraActual.nivel}
                </div>
              </div>

              {/* Métricas estimadas */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 my-5">
                <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4">
                  <span className="text-xs text-slate-400 block">Densidad urinaria</span>
                  <span className="text-xl font-bold text-white mt-1 block">
                    {muestraActual.densidad}
                  </span>
                  <span className="text-[11px] text-slate-500">Normal: 1.010 - 1.020</span>
                </div>

                <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4">
                  <span className="text-xs text-slate-400 block">pH estimado</span>
                  <span className="text-xl font-bold text-white mt-1 block">
                    {muestraActual.ph}
                  </span>
                  <span className="text-[11px] text-slate-500">Balance fisiológico</span>
                </div>

                <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4 col-span-2 sm:col-span-1">
                  <span className="text-xs text-slate-400 block">Filtrado de Calcio</span>
                  <span className="text-xl font-bold text-white mt-1 block">
                    {muestraActual.alerta ? 'Riesgo Alto' : 'Normal en 1/6 G'}
                  </span>
                  <span className="text-[11px] text-slate-500">Protección ósea</span>
                </div>
              </div>

              {/* Mensaje clínico */}
              <div
                className={`p-4 rounded-2xl border text-xs sm:text-sm leading-relaxed ${
                  muestraActual.alerta
                    ? 'bg-amber-950/20 border-amber-500/40 text-amber-200'
                    : 'bg-emerald-950/20 border-emerald-500/40 text-emerald-200'
                }`}
              >
                <strong className={muestraActual.alerta ? 'text-amber-400' : 'text-emerald-400'}>
                  Recomendación BioAstro:
                </strong>{' '}
                {muestraActual.mensaje}
              </div>
            </div>

            {/* Botón para guardar / sincronizar la muestra */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800">
              <span className="text-xs text-slate-400">
                ¿El color coincide? Presiona para registrar la muestra diaria.
              </span>
              <button
                type="button"
                onClick={handleGuardar}
                className="bg-[#10b981] hover:bg-[#34d399] active:bg-[#059669] text-[#062018] font-bold text-sm py-2.5 px-6 rounded-xl flex items-center gap-2 cursor-pointer transition-all shadow-lg shadow-emerald-500/20"
              >
                <span>Guardar Muestra</span>
                <span>✓</span>
              </button>
            </div>
          </div>

        </div>

      </main>

      {/* FOOTER INFERIOR */}
      <footer className="px-6 sm:px-10 py-5 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 bg-[#0a0f1c]/70">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span>Sensor de análisis in-situ conectado</span>
        </div>
        <div className="italic text-slate-400">
          Respira. Tu ritmo también importa.
        </div>
      </footer>

    </div>
  );
}
