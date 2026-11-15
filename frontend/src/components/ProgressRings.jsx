function ProgressRings({ actividad, hidratacion }) {
  const radioActividad = 195;
  const circunferenciaActividad = 2 * Math.PI * radioActividad;
  const offsetActividad =
    circunferenciaActividad - (actividad / 100) * circunferenciaActividad;

  const radioAgua = 162;
  const circunferenciaAgua = 2 * Math.PI * radioAgua;
  const offsetAgua =
    circunferenciaAgua - (hidratacion / 100) * circunferenciaAgua;

  return (
    <>
      {/* Etiqueta flotante izquierda: Actividad Física */}
      <div className="ring-label label-activity">
        <span className="label-title">Actividad Física: {actividad}%</span>
        <span className="label-sub">Carga protectora ósea</span>
        <div className="label-line-left"></div>
      </div>

      {/* Etiqueta flotante derecha: Hidratación */}
      <div className="ring-label label-hydration">
        <div className="label-line-right"></div>
        <span className="label-title">Hidratación: {hidratacion}%</span>
        <span className="label-sub">Balance hídrico diario</span>
      </div>

      {/* ANILLOS CONCÉNTRICOS SVG */}
      <svg className="progress-rings" width="450" height="450" viewBox="0 0 450 450">
        <defs>
          <linearGradient id="gradActividad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2dd4bf" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
          <linearGradient id="gradAgua" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#2563eb" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Fondo de los dos anillos */}
        <circle
          cx="225"
          cy="225"
          r={radioActividad}
          className="ring-bg"
          strokeWidth="12"
        />
        <circle
          cx="225"
          cy="225"
          r={radioAgua}
          className="ring-bg"
          strokeWidth="12"
        />

        {/* Anillo Exterior: Actividad Física (Verde/Turquesa) */}
        <circle
          cx="225"
          cy="225"
          r={radioActividad}
          className="ring-progress"
          stroke="url(#gradActividad)"
          strokeWidth="12"
          strokeDasharray={circunferenciaActividad}
          strokeDashoffset={offsetActividad}
          strokeLinecap="round"
          filter="url(#glow)"
        />

        {/* Anillo Interior: Agua (Azul) */}
        <circle
          cx="225"
          cy="225"
          r={radioAgua}
          className="ring-progress"
          stroke="url(#gradAgua)"
          strokeWidth="12"
          strokeDasharray={circunferenciaAgua}
          strokeDashoffset={offsetAgua}
          strokeLinecap="round"
          filter="url(#glow)"
        />
      </svg>
    </>
  );
}

export default ProgressRings;
