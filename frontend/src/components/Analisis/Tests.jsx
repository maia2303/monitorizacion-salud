import React from 'react';

function IlustracionPANAS() {
  return (
    <svg
      viewBox="0 0 320 190"
      className="w-full max-w-[290px] h-44 mx-auto select-none pointer-events-none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Estrellas y destellos de fondo */}
      <circle cx="42" cy="88" r="1.5" fill="#64748b" />
      <circle cx="115" cy="24" r="2" fill="#94a3b8" />
      <circle cx="195" cy="48" r="1.5" fill="#64748b" />
      <circle cx="272" cy="72" r="1.8" fill="#64748b" />
      <circle cx="255" cy="128" r="1.5" fill="#38bdf8" />
      <circle cx="72" cy="135" r="1.5" fill="#64748b" />

      {/* Cruces estelares */}
      <g stroke="#57d9ed" strokeWidth="1.5" strokeLinecap="round" opacity="0.75">
        <line x1="160" y1="22" x2="160" y2="30" />
        <line x1="156" y1="26" x2="164" y2="26" />
        <line x1="234" y1="138" x2="234" y2="146" />
        <line x1="230" y1="142" x2="238" y2="142" />
      </g>

      {/* Planeta con anillo arriba a la izquierda */}
      <g transform="translate(68, 38) rotate(-18)">
        <circle cx="0" cy="0" r="14" fill="#2ee59d" />
        <path
          d="M-24 2 C-16 8 16 8 24 2"
          stroke="#57d9ed"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M-22 -1 C-12 -6 12 -6 22 -1"
          stroke="#0f293a"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
          opacity="0.5"
        />
      </g>

      {/* Ícono emoción positiva (arriba derecha) */}
      <g transform="translate(232, 36)">
        <circle cx="0" cy="0" r="14" fill="#2ee59d" />
        <circle cx="-4.5" cy="-3" r="1.8" fill="#0b1929" />
        <circle cx="4.5" cy="-3" r="1.8" fill="#0b1929" />
        <path
          d="M-5.5 3.5 Q0 8.5 5.5 3.5"
          stroke="#0b1929"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
      </g>

      {/* Ícono emoción reflexiva/baja (izquierda centro) */}
      <g transform="translate(106, 68)">
        <circle cx="0" cy="0" r="10" fill="#38bdf8" opacity="0.9" />
        <circle cx="-3.2" cy="-2" r="1.3" fill="#0b1929" />
        <circle cx="3.2" cy="-2" r="1.3" fill="#0b1929" />
        <path
          d="M-3.8 4.2 Q0 1.2 3.8 4.2"
          stroke="#0b1929"
          strokeWidth="1.6"
          strokeLinecap="round"
          fill="none"
        />
      </g>

      {/* Ondas cósmicas suaves */}
      <path
        d="M36 112 Q55 104 74 112 T112 112"
        stroke="#334e68"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M206 86 Q224 78 242 86 T278 86"
        stroke="#334e68"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M214 98 Q232 90 250 98 T286 98"
        stroke="#273f57"
        strokeWidth="1.4"
        strokeLinecap="round"
        fill="none"
      />

      {/* Superficie lunar donde está sentado el astronauta */}
      <path
        d="M86 172 C106 146 214 146 234 172 Z"
        fill="#27384c"
      />
      <ellipse cx="145" cy="163" rx="8" ry="3" fill="#1c2a3a" />
      <ellipse cx="195" cy="165" rx="6" ry="2.2" fill="#1c2a3a" />

      {/* Mochila espacial */}
      <rect x="158" y="102" width="22" height="32" rx="6" fill="#cbd5e1" />

      {/* Cuerpo del astronauta sentado pensativo */}
      <path
        d="M140 108 C140 100 164 100 166 110 L170 140 C170 146 146 146 142 140 Z"
        fill="#e2e8f0"
      />
      {/* Piernas flexionadas */}
      <path
        d="M146 138 L126 148 L124 162 L136 162 L144 148 L162 146"
        fill="#cbd5e1"
      />
      <rect x="118" y="158" width="18" height="7" rx="3.5" fill="#94a3b8" />

      {/* Brazo apoyado pensativo */}
      <path
        d="M148 112 L134 124 L138 104"
        stroke="#f1f5f9"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Casco del astronauta */}
      <circle cx="150" cy="88" r="20" fill="#f1f5f9" />
      {/* Visor oscuro con reflejo */}
      <ellipse cx="144" cy="88" rx="13" ry="11" fill="#132639" />
      <path
        d="M136 82 Q142 79 148 82"
        stroke="#57d9ed"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.7"
      />
    </svg>
  );
}

function IlustracionSueno() {
  return (
    <svg
      viewBox="0 0 320 190"
      className="w-full max-w-[290px] h-44 mx-auto select-none pointer-events-none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Estrellas suaves */}
      <circle cx="62" cy="54" r="1.5" fill="#64748b" />
      <circle cx="112" cy="34" r="1.8" fill="#94a3b8" />
      <circle cx="156" cy="52" r="1.4" fill="#64748b" />
      <circle cx="256" cy="40" r="1.6" fill="#64748b" />
      <circle cx="268" cy="108" r="1.5" fill="#64748b" />
      <circle cx="52" cy="112" r="1.5" fill="#38bdf8" />

      {/* Destello estelar */}
      <g stroke="#2ee59d" strokeWidth="1.5" strokeLinecap="round" opacity="0.8">
        <line x1="88" y1="68" x2="88" y2="76" />
        <line x1="84" y1="72" x2="92" y2="72" />
      </g>

      {/* Gran planeta verde menta con anillo (arriba derecha) */}
      <g transform="translate(206, 54) rotate(-22)">
        {/* Anillo trasero */}
        <ellipse
          cx="0"
          cy="0"
          rx="38"
          ry="9"
          stroke="#334e68"
          strokeWidth="4"
          fill="none"
        />
        {/* Esfera del planeta */}
        <circle cx="0" cy="0" r="22" fill="#2ee59d" />
        {/* Cráteres del planeta */}
        <circle cx="-7" cy="-6" r="4" fill="#1cb87a" opacity="0.7" />
        <circle cx="8" cy="-4" r="2.5" fill="#1cb87a" opacity="0.7" />
        <circle cx="5" cy="8" r="5" fill="#1cb87a" opacity="0.5" />
        {/* Arco frontal del anillo */}
        <path
          d="M-38 0 A38 9 0 0 0 38 0"
          stroke="#476a8a"
          strokeWidth="4"
          fill="none"
        />
      </g>

      {/* Base lunar suave */}
      <ellipse cx="160" cy="162" rx="76" ry="14" fill="#223244" />
      <ellipse cx="160" cy="166" rx="54" ry="8" fill="#1a2736" />

      {/* Astronauta recostado descansando */}
      {/* Mochila apoyada */}
      <rect
        x="114"
        y="124"
        width="24"
        height="18"
        rx="5"
        transform="rotate(-18 114 124)"
        fill="#94a3b8"
      />

      {/* Torso y traje recostado */}
      <path
        d="M124 126 C134 118 158 124 170 136 L198 134 C205 134 208 144 200 148 L166 154 C146 156 126 146 124 126 Z"
        fill="#e2e8f0"
      />

      {/* Piernas cruzadas relajadas */}
      <path
        d="M168 144 L204 134 L212 146 L172 154 Z"
        fill="#cbd5e1"
      />
      <rect
        x="204"
        y="130"
        width="10"
        height="18"
        rx="4"
        transform="rotate(-12 204 130)"
        fill="#94a3b8"
      />

      {/* Brazo relajado sobre el pecho */}
      <path
        d="M136 126 Q152 138 166 130"
        stroke="#f8fafc"
        strokeWidth="9"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="168" cy="129" r="5" fill="#94a3b8" />

      {/* Casco inclinado mirando las estrellas */}
      <circle cx="126" cy="104" r="20" fill="#f1f5f9" />
      <ellipse
        cx="132"
        cy="102"
        rx="13"
        ry="10.5"
        transform="rotate(-12 132 102)"
        fill="#132639"
      />
      <path
        d="M124 96 Q131 93 138 96"
        stroke="#57d9ed"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.75"
      />
    </svg>
  );
}

export default function Tests({
  astronauta = { nombre: 'Cmdte. Alex Vega', tripulacion: 'Tripulación A' },
  onCambiarPestana,
  onVolver,
}) {
  const irAPestana = (id) => {
    if (onCambiarPestana) {
      onCambiarPestana(id);
    } else if (id === 'inicio' && onVolver) {
      onVolver();
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#0b1220] text-[#eaf7ff] flex flex-col justify-between font-sans selection:bg-cyan-500 selection:text-slate-900">
      {/* HEADER SUPERIOR UNIFICADO */}
      <header className="px-6 sm:px-10 py-5 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs md:text-sm font-mono tracking-wider">
            <span className="font-bold text-slate-200">ROVER LUNAR</span>
            <span className="text-cyan-400 font-bold mx-1">//</span>
            <span className="text-slate-300 font-normal">DÍA 42</span>
          </div>
          <div className="text-xs text-slate-400 mt-1">
            {astronauta.nombre} · {astronauta.tripulacion}
          </div>
        </div>

        <nav className="flex flex-wrap items-center gap-2 sm:mr-48">
          <button
            type="button"
            onClick={() => irAPestana('inicio')}
            className="px-4 py-2 rounded-xl text-xs sm:text-sm font-medium tracking-wide text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 transition-colors cursor-pointer select-none"
          >
            Inicio
          </button>

          <button
            type="button"
            className="px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold tracking-wide bg-[#0d342f] text-[#34d399] border border-emerald-500/30 shadow-[0_0_15px_rgba(52,211,153,0.15)] cursor-pointer select-none"
          >
            Bienestar y Tests
          </button>

          <button
            type="button"
            onClick={() => irAPestana('test_orina')}
            className="px-4 py-2 rounded-xl text-xs sm:text-sm font-medium tracking-wide text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 transition-colors cursor-pointer select-none"
          >
            Test Orina
          </button>

          <button
            type="button"
            onClick={() => irAPestana('test_pvc')}
            className="px-4 py-2 rounded-xl text-xs sm:text-sm font-medium tracking-wide text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 transition-colors cursor-pointer select-none"
          >
            Test PVC
          </button>

          <button
            type="button"
            onClick={() => irAPestana('test_qus')}
            className="px-4 py-2 rounded-xl text-xs sm:text-sm font-medium tracking-wide text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 transition-colors cursor-pointer select-none"
          >
            Test QUS
          </button>
        </nav>
      </header>

      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-6 sm:px-10 py-8 md:py-10 flex flex-col justify-center">
        {/* ENCABEZADO DE SECCIÓN */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Bienestar y Evaluación
            </h1>
            <p className="text-[#a8c4d5] mt-2 text-base sm:text-lg">
              Evaluaciones emocionales y de descanso para la misión.
            </p>
          </div>

          <div className="bg-[#102a26] text-[#2ee59d] border border-[#2ee59d]/25 px-5 py-2 rounded-full text-xs sm:text-sm font-medium flex items-center gap-2.5 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#2ee59d] shadow-[0_0_8px_#2ee59d] animate-pulse"></span>
            <span>Todo en orden a bordo</span>
          </div>
        </div>

        {/* DOS TARJETAS PRINCIPALES DE SELECCIÓN */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* TARJETA 1: ESTADO EMOCIONAL — PANAS */}
          <div className="bg-[#162234] border border-slate-800/90 hover:border-slate-700 rounded-3xl p-7 sm:p-10 flex flex-col justify-between shadow-2xl transition-all duration-300">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Estado emocional — PANAS
              </h2>
              <p className="text-[#a8c4d5] text-base sm:text-lg mt-2 leading-relaxed">
                Registrá cómo te sentís en este momento
              </p>
            </div>

            <div className="my-6 flex items-center justify-center">
              <IlustracionPANAS />
            </div>

            <button
              type="button"
              onClick={() => irAPestana('test_panas')}
              className="w-full bg-[#2ee59d] hover:bg-[#3df2aa] active:scale-[0.99] text-[#062018] font-bold text-base sm:text-lg py-3.5 px-6 rounded-full shadow-[0_0_24px_rgba(46,229,157,0.25)] transition-all duration-200 cursor-pointer"
            >
              Comenzar evaluación
            </button>
          </div>

          {/* TARJETA 2: CALIDAD DEL SUEÑO */}
          <div className="bg-[#162234] border border-slate-800/90 hover:border-slate-700 rounded-3xl p-7 sm:p-10 flex flex-col justify-between shadow-2xl transition-all duration-300">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Calidad del sueño
              </h2>
              <p className="text-[#a8c4d5] text-base sm:text-lg mt-2 leading-relaxed">
                Contanos cómo fue tu descanso antes de comenzar la jornada
              </p>
            </div>

            <div className="my-6 flex items-center justify-center">
              <IlustracionSueno />
            </div>

            <button
              type="button"
              onClick={() => irAPestana('test_sueno')}
              className="w-full bg-[#2ee59d] hover:bg-[#3df2aa] active:scale-[0.99] text-[#062018] font-bold text-base sm:text-lg py-3.5 px-6 rounded-full shadow-[0_0_24px_rgba(46,229,157,0.25)] transition-all duration-200 cursor-pointer"
            >
              Registrar descanso
            </button>
          </div>
        </div>
      </main>

      {/* PIE DE PÁGINA */}
      <footer className="w-full px-6 sm:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm">
        <div className="flex items-center gap-2 text-[#4d8ec4]">
          <span className="w-2 h-2 rounded-full bg-[#3b9eff]"></span>
          <span>Datos sincronizados · 14:32</span>
        </div>
        <div className="text-[#8ba3b8]">
          Respira. Tu ritmo también importa.
        </div>
      </footer>
    </div>
  );
}
