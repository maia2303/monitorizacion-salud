import React from 'react';

/**
 * Avatar vectorial de Grace K. Wilson (Comandante)
 * Ilustración estilo Artemis con uniforme médico y cuello verde esmeralda.
 */
export function GraceAvatar({ className = "w-28 h-28" }) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Fondo circular pizarra oscuro */}
      <circle cx="60" cy="60" r="58" fill="#1b253b" />
      <circle cx="60" cy="60" r="57" stroke="#334155" strokeWidth="1.5" />

      {/* Cabello parte posterior con rizos */}
      <circle cx="42" cy="46" r="16" fill="#1a1c23" />
      <circle cx="78" cy="46" r="16" fill="#1a1c23" />
      <circle cx="36" cy="58" r="13" fill="#1a1c23" />
      <circle cx="84" cy="58" r="13" fill="#1a1c23" />
      <circle cx="39" cy="70" r="10" fill="#1a1c23" />
      <circle cx="81" cy="70" r="10" fill="#1a1c23" />
      <ellipse cx="60" cy="42" rx="24" ry="18" fill="#1a1c23" />

      {/* Cuello */}
      <rect x="52" y="68" width="16" height="15" fill="#784835" rx="4" />

      {/* Cabeza / Rostro */}
      <ellipse cx="60" cy="54" rx="19" ry="20" fill="#8c553d" />

      {/* Orejas */}
      <ellipse cx="40" cy="56" rx="3.5" ry="5.5" fill="#784835" />
      <ellipse cx="80" cy="56" rx="3.5" ry="5.5" fill="#784835" />

      {/* Cabello frontal con volumen y raya */}
      <path
        d="M41 46 C41 33 52 28 60 28 C68 28 79 33 79 46 C75 40 70 38 60 40 C50 38 45 41 41 46 Z"
        fill="#1a1c23"
      />
      <ellipse cx="46" cy="38" rx="8" ry="6" fill="#1a1c23" />
      <ellipse cx="74" cy="38" rx="8" ry="6" fill="#1a1c23" />
      <ellipse cx="60" cy="35" rx="9" ry="6" fill="#1a1c23" />
      <circle cx="38" cy="51" r="6" fill="#1a1c23" />
      <circle cx="82" cy="51" r="6" fill="#1a1c23" />

      {/* Cejas */}
      <path
        d="M48 48 Q53 45 56 47"
        stroke="#1a1c23"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M72 48 Q67 45 64 47"
        stroke="#1a1c23"
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      {/* Ojos */}
      <ellipse cx="51" cy="52.5" rx="2.5" ry="2.7" fill="#111827" />
      <ellipse cx="69" cy="52.5" rx="2.5" ry="2.7" fill="#111827" />
      <circle cx="51.8" cy="51.5" r="0.8" fill="#ffffff" />
      <circle cx="69.8" cy="51.5" r="0.8" fill="#ffffff" />

      {/* Nariz */}
      <path
        d="M58 57 Q60 60 62 57"
        stroke="#673926"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* Sonrisa radiante */}
      <path
        d="M51 63.5 Q60 71 69 63.5 Z"
        fill="#ffffff"
      />
      <path
        d="M51 63.5 Q60 71 69 63.5"
        stroke="#4f2718"
        strokeWidth="1.4"
        fill="none"
      />
      <path
        d="M49.5 63 C51 63 52 64 52 64"
        stroke="#4f2718"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <path
        d="M70.5 63 C69 63 68 64 68 64"
        stroke="#4f2718"
        strokeWidth="1.3"
        strokeLinecap="round"
      />

      {/* Uniforme Artemis blanco */}
      <path
        d="M32 105 C32 87 46 82 60 82 C74 82 88 87 88 105 Z"
        fill="#e2e8f0"
      />

      {/* Cuello verde esmeralda distintivo */}
      <path
        d="M48 80 L57 90 L52 94 L42 84 Z"
        fill="#10b981"
      />
      <path
        d="M72 80 L63 90 L68 94 L78 84 Z"
        fill="#10b981"
      />

      {/* Escote interior */}
      <path d="M57 90 L63 90 L60 97 Z" fill="#784835" />
      <line x1="60" y1="97" x2="60" y2="105" stroke="#cbd5e1" strokeWidth="1.5" />
    </svg>
  );
}

/**
 * Avatar vectorial de Rocky C. Mendoza (Piloto)
 * Ilustración estilo Artemis con barba recortada y cuello azul cielo.
 */
export function RockyAvatar({ className = "w-28 h-28" }) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Fondo circular pizarra oscuro */}
      <circle cx="60" cy="60" r="58" fill="#1b253b" />
      <circle cx="60" cy="60" r="57" stroke="#334155" strokeWidth="1.5" />

      {/* Cuello */}
      <rect x="52" y="68" width="16" height="15" fill="#ab7650" rx="4" />

      {/* Rostro masculino con mandíbula definida */}
      <path
        d="M42 53 C42 41 50 38 60 38 C70 38 78 41 78 53 C78 64 71 74 60 74 C49 74 42 64 42 53 Z"
        fill="#c48e65"
      />

      {/* Orejas */}
      <ellipse cx="40" cy="55" rx="3.5" ry="5.5" fill="#ab7650" />
      <ellipse cx="80" cy="55" rx="3.5" ry="5.5" fill="#ab7650" />

      {/* Cabello peinado corto y oscuro */}
      <path
        d="M42 50 C41 40 46 32 60 32 C74 32 79 40 78 50 C76 43 72 40 60 40 C48 40 44 43 42 50 Z"
        fill="#1e232a"
      />
      <ellipse cx="60" cy="36" rx="16" ry="6" fill="#1e232a" />
      <path d="M42 46 L44 52 L47 48 Z" fill="#1e232a" />
      <path d="M78 46 L76 52 L73 48 Z" fill="#1e232a" />

      {/* Cejas masculinas definidas */}
      <path
        d="M47 48 Q52 45 56 47"
        stroke="#1e232a"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M73 48 Q68 45 64 47"
        stroke="#1e232a"
        strokeWidth="2.2"
        strokeLinecap="round"
      />

      {/* Ojos */}
      <ellipse cx="51" cy="52.5" rx="2.5" ry="2.7" fill="#111827" />
      <ellipse cx="69" cy="52.5" rx="2.5" ry="2.7" fill="#111827" />
      <circle cx="51.8" cy="51.5" r="0.8" fill="#ffffff" />
      <circle cx="69.8" cy="51.5" r="0.8" fill="#ffffff" />

      {/* Nariz */}
      <path
        d="M58 55 Q60 58.5 62 55"
        stroke="#985f38"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
      />

      {/* Barba bien delineada y bigote */}
      {/* Bigote */}
      <path
        d="M51 61.5 C54 60.5 57 61.5 60 63.5 C63 61.5 66 60.5 69 61.5 C67 63.5 64 64.5 60 64.5 C56 64.5 53 63.5 51 61.5 Z"
        fill="#2b2d35"
      />
      {/* Barba a lo largo de la mandíbula */}
      <path
        d="M43 56 C44 67 51 74.5 60 74.5 C69 74.5 76 67 77 56 C77 61 74 71 69 73 C65 74.5 55 74.5 51 73 C46 71 43 61 43 56 Z"
        fill="#2b2d35"
      />
      {/* Pera / perilla */}
      <ellipse cx="60" cy="71.5" rx="3.5" ry="2" fill="#2b2d35" />

      {/* Sonrisa amistosa */}
      <path
        d="M54 64.5 Q60 69 66 64.5 Z"
        fill="#ffffff"
      />
      <path
        d="M54 64.5 Q60 69 66 64.5"
        stroke="#2b2d35"
        strokeWidth="1.2"
        fill="none"
      />

      {/* Uniforme Artemis blanco */}
      <path
        d="M32 105 C32 87 46 82 60 82 C74 82 88 87 88 105 Z"
        fill="#e2e8f0"
      />

      {/* Cuello azul cielo distintivo */}
      <path
        d="M48 80 L57 90 L52 94 L42 84 Z"
        fill="#0284c7"
      />
      <path
        d="M72 80 L63 90 L68 94 L78 84 Z"
        fill="#0284c7"
      />

      {/* Escote interior */}
      <path d="M57 90 L63 90 L60 97 Z" fill="#ab7650" />
      <line x1="60" y1="97" x2="60" y2="105" stroke="#cbd5e1" strokeWidth="1.5" />
    </svg>
  );
}

