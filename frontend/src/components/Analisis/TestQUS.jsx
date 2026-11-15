import React, { useState } from 'react';
import qusApi from '../../services/qusApi';
import simulacionJSON from '../../data/simulacionQUS.json';

export default function TestQUS({ onVolver }) {
  // Estado de sincronización
  const [sincronizando, setSincronizando] = useState(false);
  const [resultadoBackend, setResultadoBackend] = useState(null);
  const [mensajeExito, setMensajeExito] = useState('');
  const [mostrarJSONCrudo, setMostrarJSONCrudo] = useState(false);
  const [errorBackend, setErrorBackend] = useState('');

  // Sincronizar datos del JSON con la API del backend
  const handleSincronizar = async () => {
    setSincronizando(true);
    setErrorBackend('');
    setMensajeExito('');

    try {
      // Lleva el JSON a la API del backend (POST /api/qus/sincronizar)
      const respuesta = await qusApi.sincronizar(simulacionJSON);

      if (respuesta && respuesta.resultado) {
        setResultadoBackend(respuesta.resultado);
        setMensajeExito(
          respuesta.mensaje || 'Telemetría de ultrasonido QUS sincronizada y calculada correctamente'
        );
      }
    } catch (err) {
      setErrorBackend(err.message || 'Error al conectar con la API del backend');
    } finally {
      setSincronizando(false);
    }
  };

  return (
    <div className="w-full bg-[#0b1220] text-slate-100 flex flex-col justify-between font-sans selection:bg-cyan-500 selection:text-slate-900 min-h-screen">
      
      {/* 1. HEADER SUPERIOR */}
      <header className="px-6 sm:px-10 py-4 border-b border-slate-800/80 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={onVolver}
          className="bg-[#103b32] hover:bg-[#14473d] text-[#34d399] font-medium text-sm px-5 py-2 rounded-xl border border-emerald-500/30 transition-all cursor-pointer shadow-sm flex items-center gap-2"
        >
          <span>←</span>
          <span>Volver a Inicio</span>
        </button>

        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-400 font-mono">
            DISPOSITIVO: {simulacionJSON.device_id}
          </span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse"></span>
        </div>
      </header>

      {/* 2. CONTENIDO PRINCIPAL */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-8 py-8 md:py-10">
        
        {/* TÍTULO Y DESCRIPCIÓN */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-1">
              <span>BioAstro Osteología</span>
              <span>//</span>
              <span>Módulo de Ultrasonometría Cuantitativa</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Test QUS · Ultrasonido Óseo de Calcáneo
            </h1>
            <p className="text-slate-400 mt-2 text-sm sm:text-base">
              Simulacro de ingreso de telemetría acústica y cálculo de densidad trabecular en microgravedad (1/6 G).
            </p>
          </div>

          <div className="bg-[#0e2a24] text-emerald-400 border border-emerald-500/20 px-4 py-2 rounded-full text-xs sm:text-sm font-medium flex items-center gap-2">
            <span>Astronauta:</span>
            <strong className="text-white">{simulacionJSON.astronaut_name}</strong>
          </div>
        </div>

        {/* MENSAJES DE ESTADO */}
        {mensajeExito && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-950/70 border border-emerald-500/40 text-emerald-200 text-xs sm:text-sm flex items-center gap-3 shadow-lg animate-fadeIn">
            <span className="w-3 h-3 rounded-full bg-emerald-400 flex-shrink-0 animate-ping"></span>
            <div>
              <strong className="text-white block font-semibold">{mensajeExito}</strong>
              <span className="text-slate-300">
                La API del backend ha procesado las métricas, ejecutado las cuentas clínicas y registrado los datos.
              </span>
            </div>
          </div>
        )}

        {errorBackend && (
          <div className="mb-6 p-4 rounded-2xl bg-red-950/60 border border-red-500/40 text-red-200 text-xs sm:text-sm flex items-center gap-3 shadow-lg">
            <span>⚠️</span>
            <span>{errorBackend}</span>
          </div>
        )}

        {/* GRID DE DOS COLUMNAS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* COLUMNA IZQUIERDA (5/12): PAQUETE DE DATOS JSON A SINCRONIZAR */}
          <div className="lg:col-span-5 bg-[#131d2e] border border-slate-800/90 rounded-3xl p-6 sm:p-7 shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>🛰️</span> Telemetría del Dispositivo
                </h2>
                <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-slate-800 text-cyan-300 border border-slate-700">
                  simulacionQUS.json
                </span>
              </div>

              <p className="text-xs text-slate-400 mb-5 leading-relaxed">
                Datos capturados por el sensor QUS del rover lunar listos para transmitir a la API de BioAstro:
              </p>

              {/* Tarjetas resumen de métricas del sensor */}
              <div className="space-y-3 mb-5">
                <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400 block">Velocidad del Sonido (SOS)</span>
                    <span className="text-base font-bold text-white">
                      {simulacionJSON.metrics.sos_ms} m/s
                    </span>
                  </div>
                  <span className="text-[11px] text-cyan-400 font-mono bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
                    sos_ms
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400 block">Atenuación Acústica (BUA)</span>
                    <span className="text-base font-bold text-white">
                      {simulacionJSON.metrics.bua_db_mhz} dB/MHz
                    </span>
                  </div>
                  <span className="text-[11px] text-cyan-400 font-mono bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
                    bua_db_mhz
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400 block">Calcio Urinario</span>
                    <span className="text-base font-bold text-white">
                      {simulacionJSON.metrics.calcium_urine_mg_dl} mg/dL
                    </span>
                  </div>
                  <span className="text-[11px] text-amber-400 font-mono bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/30">
                    calcium_urine
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400 block">Marcador Resorción (CTX)</span>
                    <span className="text-base font-bold text-white">
                      {simulacionJSON.metrics.ctx_ug_mmol} µg/mmol
                    </span>
                  </div>
                  <span className="text-[11px] text-amber-400 font-mono bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/30">
                    ctx_ug_mmol
                  </span>
                </div>
              </div>

              {/* Botón para ver el JSON crudo */}
              <button
                type="button"
                onClick={() => setMostrarJSONCrudo((prev) => !prev)}
                className="text-xs text-cyan-400 hover:text-cyan-300 underline cursor-pointer mb-5 block"
              >
                {mostrarJSONCrudo ? 'Ocultar JSON de simulacro' : 'Ver archivo JSON original simulacionQUS.json'}
              </button>

              {mostrarJSONCrudo && (
                <pre className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-emerald-300 overflow-x-auto mb-5">
                  {JSON.stringify(simulacionJSON, null, 2)}
                </pre>
              )}
            </div>

            {/* BOTÓN PRINCIPAL DE SINCRONIZACIÓN */}
            <button
              type="button"
              disabled={sincronizando}
              onClick={handleSincronizar}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-[#34d399] hover:from-emerald-400 hover:to-[#4eedb2] active:scale-[0.98] text-[#051c16] font-extrabold text-sm sm:text-base flex items-center justify-center gap-2.5 transition-all cursor-pointer shadow-lg shadow-emerald-500/30 disabled:opacity-50"
            >
              <span>{sincronizando ? 'Sincronizando con Backend...' : '⚡ Sincronizar Datos QUS con Backend'}</span>
              {!sincronizando && <span>→</span>}
            </button>
          </div>

          {/* COLUMNA DERECHA (7/12): CUENTAS REALIZADAS POR EL BACKEND */}
          <div className="lg:col-span-7 bg-[#131d2e] border border-slate-800/90 rounded-3xl p-6 sm:p-7 shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
                <div>
                  <span className="text-xs text-slate-400 font-mono">RESPUESTA DE LA API BACKEND</span>
                  <h2 className="text-xl font-bold text-white mt-0.5">
                    Cuentas Clínicas y Guardado en Base de Datos
                  </h2>
                </div>
                {resultadoBackend && (
                  <span className="px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/30 text-xs font-semibold">
                    ● Calculado por Node.js
                  </span>
                )}
              </div>

              {!resultadoBackend ? (
                /* Estado previo a la sincronización */
                <div className="py-12 px-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 text-center flex flex-col items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-slate-800/80 flex items-center justify-center text-3xl mb-4">
                    📡
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">
                    Esperando sincronización de telemetría
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 max-w-md leading-relaxed">
                    Presiona el botón de la izquierda para enviar el JSON a la API del backend.
                    El servidor procesará la velocidad y atenuación acústica, calculará el <strong>Stiffness Index (SI)</strong> y el <strong>T-Score</strong>, y guardará el registro en MySQL.
                  </p>
                </div>
              ) : (
                /* Estado con las cuentas devueltas por el backend */
                <div className="space-y-6 animate-fadeIn">
                  
                  {/* Tarjetas de Cuentas Principales */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    
                    {/* Stiffness Index */}
                    <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-700/80 shadow-md">
                      <span className="text-xs text-slate-400 block">Stiffness Index (SI)</span>
                      <div className="text-3xl font-black text-white font-mono mt-1">
                        {resultadoBackend.calculos.stiffness_index}
                      </div>
                      <span className="text-[11px] text-cyan-400 font-medium block mt-1">
                        (0.67·BUA + 0.28·SOS - 420)
                      </span>
                    </div>

                    {/* T-Score */}
                    <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-700/80 shadow-md">
                      <span className="text-xs text-slate-400 block">T-Score Estimado</span>
                      <div className={`text-3xl font-black font-mono mt-1 ${
                        resultadoBackend.calculos.t_score < -2.5 ? 'text-amber-400' : 'text-emerald-400'
                      }`}>
                        {resultadoBackend.calculos.t_score}
                      </div>
                      <span className="text-[11px] text-slate-400 font-medium block mt-1">
                        (SI - 100) / 15
                      </span>
                    </div>

                    {/* Z-Score */}
                    <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-700/80 shadow-md">
                      <span className="text-xs text-slate-400 block">Z-Score Ajustado</span>
                      <div className="text-3xl font-black text-white font-mono mt-1">
                        {resultadoBackend.calculos.z_score}
                      </div>
                      <span className="text-[11px] text-slate-400 font-medium block mt-1">
                        (SI - 90) / 14
                      </span>
                    </div>

                  </div>

                  {/* Diagnóstico y Resorción */}
                  <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <span className="text-xs text-slate-400">Diagnóstico preliminar:</span>
                      <strong className="text-sm text-amber-300 font-semibold">
                        {resultadoBackend.calculos.clasificacion}
                      </strong>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-slate-800">
                      <span className="text-xs text-slate-400">Tasa de resorción ósea (CTX):</span>
                      <strong className="text-xs text-amber-400 font-medium font-mono">
                        {resultadoBackend.calculos.nivel_resorcion}
                      </strong>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-slate-800">
                      <span className="text-xs text-slate-400">Calciuria en orina:</span>
                      <strong className="text-xs text-slate-200 font-medium font-mono">
                        {resultadoBackend.calculos.estado_calciuria}
                      </strong>
                    </div>
                  </div>

                  {/* Recomendaciones emitidas por el backend */}
                  <div className="p-5 rounded-2xl bg-[#09221c] border border-emerald-500/30">
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block mb-2">
                      Prescripciones automáticas calculadas:
                    </span>
                    <ul className="space-y-1.5 text-xs text-slate-200">
                      {resultadoBackend.calculos.recomendaciones.map((rec, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-emerald-400 font-bold">•</span>
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Estado de persistencia en MySQL */}
                  <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400">Base de Datos MySQL (bioastro):</span>
                    <span className="text-emerald-400 font-semibold">
                      {resultadoBackend.persistencia?.guardado
                        ? `✓ Guardado (ID: ${resultadoBackend.persistencia.id_insercion})`
                        : '✓ Datos validados y listos en backend'}
                    </span>
                  </div>

                </div>
              )}
            </div>

            {resultadoBackend && (
              <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
                <button
                  type="button"
                  onClick={() => setResultadoBackend(null)}
                  className="text-xs text-slate-400 hover:text-white underline cursor-pointer"
                >
                  Limpiar y realizar nuevo simulacro
                </button>
              </div>
            )}
          </div>

        </div>

      </main>

      {/* 3. FOOTER */}
      <footer className="px-6 sm:px-10 py-5 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 bg-[#0a0f1c]/70">
        <div>
          <span>API Endpoint: </span>
          <code className="text-cyan-300 font-mono">POST /api/qus/sincronizar</code>
        </div>
        <div className="italic text-slate-400">
          Respira. Tu ritmo también importa.
        </div>
      </footer>

    </div>
  );
}
