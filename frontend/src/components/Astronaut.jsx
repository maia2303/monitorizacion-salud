function Astronaut() {
  return (
    <svg
      className="astronaut-svg"
      viewBox="0 0 200 240"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Sombreado principal turquesa/pizarra iluminado en los bordes como la imagen */}
        <linearGradient id="holoSuit" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#489fb5" />
          <stop offset="28%" stopColor="#245568" />
          <stop offset="72%" stopColor="#163847" />
          <stop offset="100%" stopColor="#3b8ea5" />
        </linearGradient>

        {/* Sombreado más oscuro para extremidades en segundo plano */}
        <linearGradient id="holoSuitBack" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2b677c" />
          <stop offset="55%" stopColor="#153543" />
          <stop offset="100%" stopColor="#235366" />
        </linearGradient>

        {/* Gradiente esférico para el casco */}
        <radialGradient id="holoHelmet" cx="35%" cy="25%" r="70%">
          <stop offset="0%" stopColor="#67c3d6" />
          <stop offset="45%" stopColor="#285e72" />
          <stop offset="85%" stopColor="#13313e" />
          <stop offset="100%" stopColor="#3c8da3" />
        </radialGradient>

        {/* Interior oscuro del visor */}
        <linearGradient id="holoVisor" x1="0%" y1="0%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="#061720" />
          <stop offset="65%" stopColor="#0c2b38" />
          <stop offset="100%" stopColor="#287a8c" />
        </linearGradient>
      </defs>

      <g className="astro-bounce">
        {/* ================= MOCHILA PLSS EN 2 NIVELES ================= */}
        <g className="holo-pack">
          {/* Parte superior redondeada de la mochila */}
          <path
            d="M58 64 V44 C58 35, 65 30, 75 30 H90 C96 30, 100 35, 100 42 V64 Z"
            fill="url(#holoSuitBack)"
            stroke="#67e8f9"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          {/* Línea vertical divisoria superior */}
          <path d="M74 30 V58" fill="none" stroke="#5eead4" strokeWidth="1.2" opacity="0.7" />

          {/* Cuerpo inferior de la mochila */}
          <path
            d="M53 60 C53 56, 56 54, 60 54 H92 C95 54, 97 57, 97 61 L94 126 C94 130, 91 132, 87 132 H58 C54 132, 52 129, 52 125 Z"
            fill="url(#holoSuit)"
            stroke="#67e8f9"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          {/* Línea lateral y pequeño escudo en la mochila */}
          <path d="M65 55 L63 131" fill="none" stroke="#5eead4" strokeWidth="1.3" opacity="0.8" />
          <path
            d="M57 63 H61 V68 C61 70, 59 71, 59 71 C59 71, 57 70, 57 68 Z"
            fill="#5eead4"
            opacity="0.8"
          />
        </g>

        {/* ================= BRAZO IZQUIERDO (ADELANTADO A LA DERECHA) ================= */}
        <g className="limb-arm-back">
          {/* Hombro y brazo extendido */}
          <path
            d="M114 68 C123 70, 132 82, 139 95 C145 104, 152 112, 157 118 L146 128 C139 122, 131 114, 124 104 C118 96, 113 88, 110 82 Z"
            fill="url(#holoSuitBack)"
            stroke="#67e8f9"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          {/* Pliegues del codo */}
          <path d="M126 98 Q133 95 137 89" fill="none" stroke="#5eead4" strokeWidth="1.3" opacity="0.75" />
          <path d="M130 103 Q137 100 140 94" fill="none" stroke="#5eead4" strokeWidth="1.3" opacity="0.75" />

          {/* Aro de muñeca grueso */}
          <path
            d="M144 125 L155 115 L161 121 L150 131 Z"
            fill="url(#holoSuit)"
            stroke="#67e8f9"
            strokeWidth="1.7"
            strokeLinejoin="round"
          />

          {/* Guante con dedos articulados */}
          <path
            d="M159 121 C165 125, 171 131, 172 136 C172 139, 169 140, 166 138 C165 141, 162 141, 160 139 C158 141, 155 140, 154 137 L149 131 Z"
            fill="url(#holoSuit)"
            stroke="#67e8f9"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          {/* Pulgar */}
          <path
            d="M152 131 C154 135, 155 139, 153 141 C151 142, 148 139, 147 134"
            fill="url(#holoSuit)"
            stroke="#67e8f9"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </g>

        {/* ================= PIERNA TRASERA (FLEXIONADA ATRÁS) ================= */}
        <g className="limb-leg-back">
          {/* Muslo y pantorrilla inclinados hacia atrás */}
          <path
            d="M86 132 C84 146, 78 158, 69 167 L84 185 C95 175, 102 162, 105 142 Z"
            fill="url(#holoSuitBack)"
            stroke="#67e8f9"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          {/* Pliegues en la pantorrilla trasera */}
          <path d="M74 163 Q81 170 89 175" fill="none" stroke="#5eead4" strokeWidth="1.3" opacity="0.7" />
          <path d="M71 167 Q78 174 86 179" fill="none" stroke="#5eead4" strokeWidth="1.3" opacity="0.7" />

          {/* Bota trasera levantada en paso */}
          <path
            d="M68 166 C63 166, 58 170, 58 176 C58 184, 63 196, 69 202 C74 206, 80 205, 82 200 C84 195, 83 189, 84 184 Z"
            fill="url(#holoSuitBack)"
            stroke="#67e8f9"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          {/* Suela doble de la bota trasera */}
          <path
            d="M61 171 C59 180, 64 194, 72 202"
            fill="none"
            stroke="#67e8f9"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </g>

        {/* ================= TORSO Y MÓDULO PECTORAL ================= */}
        <g className="holo-torso">
          {/* Cuerpo del torso con cintura marcada */}
          <path
            d="M74 62 C68 68, 66 86, 69 108 C70 119, 72 126, 76 130 C88 135, 108 135, 120 129 C122 123, 122 108, 121 92 C120 76, 117 65, 111 61 Z"
            fill="url(#holoSuit)"
            stroke="#67e8f9"
            strokeWidth="1.9"
            strokeLinejoin="round"
          />

          {/* Costuras del pecho y cintura */}
          <path d="M74 127 Q98 134 120 126" fill="none" stroke="#67e8f9" strokeWidth="1.6" />
          <path d="M82 67 Q98 75 113 65" fill="none" stroke="#5eead4" strokeWidth="1.4" opacity="0.8" />

          {/* Módulo de Control Pectoral (DCM) escalonado en 3D */}
          <path
            d="M99 73 H118 L120 85 L125 87 V104 C125 106, 123 108, 120 108 H95 C92 108, 90 106, 90 103 V89 C90 87, 92 86, 95 86 L98 85 Z"
            fill="url(#holoSuit)"
            stroke="#67e8f9"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          {/* Detalles internos del módulo pectoral */}
          <path d="M95 86 V105 M103 73 V86 H118" fill="none" stroke="#5eead4" strokeWidth="1.3" />
          <rect x="103" y="101" width="13" height="4" rx="1" fill="#09222c" stroke="#5eead4" strokeWidth="1" />
          <rect x="120" y="92" width="3" height="5" rx="0.8" fill="none" stroke="#5eead4" strokeWidth="1" />

          {/* Mangueras dobles curvadas desde el pecho hacia la mochila */}
          <path
            d="M66 104 C75 116, 92 120, 108 108"
            fill="none"
            stroke="#67e8f9"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <path
            d="M66 109 C76 121, 94 125, 112 109"
            fill="none"
            stroke="#5eead4"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </g>

        {/* ================= PIERNA DELANTERA (APOYADA EN EL SUELO) ================= */}
        <g className="limb-leg-front">
          {/* Cadera, muslo y pierna delantera */}
          <path
            d="M75 129 C72 145, 76 164, 83 180 C84 191, 84 202, 85 212 H110 C112 198, 114 182, 112 167 C116 153, 119 140, 118 128 C105 134, 88 134, 75 129 Z"
            fill="url(#holoSuit)"
            stroke="#67e8f9"
            strokeWidth="1.9"
            strokeLinejoin="round"
          />

          {/* Pliegue de entrepierna */}
          <path d="M100 134 C103 145, 108 156, 112 167" fill="none" stroke="#67e8f9" strokeWidth="1.7" strokeLinecap="round" />

          {/* Bolsillo / parche rectangular en el muslo */}
          <path
            d="M77 148 L91 143 L96 160 L82 165 Z"
            fill="url(#holoSuitBack)"
            stroke="#67e8f9"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path d="M92 146 L96 144 M94 153 L98 151" stroke="#5eead4" strokeWidth="1.3" />

          {/* Costura curva de la rodilla y pliegues de la tibia */}
          <path d="M83 177 Q97 169 111 175" fill="none" stroke="#5eead4" strokeWidth="1.5" opacity="0.85" />
          <path d="M87 188 Q98 186 107 189" fill="none" stroke="#5eead4" strokeWidth="1.4" opacity="0.8" />
          <path d="M87 193 Q98 191 107 194" fill="none" stroke="#5eead4" strokeWidth="1.4" opacity="0.8" />
          <path d="M87 198 Q98 196 106 199" fill="none" stroke="#5eead4" strokeWidth="1.4" opacity="0.8" />

          {/* Bota delantera apoyada firme en el piso */}
          <path
            d="M84 209 C83 214, 83 220, 84 224 C86 227, 96 229, 109 229 C118 229, 123 226, 122 221 C121 217, 114 214, 110 209 Z"
            fill="url(#holoSuit)"
            stroke="#67e8f9"
            strokeWidth="1.9"
            strokeLinejoin="round"
          />
          {/* Empeine y doble línea de suela */}
          <path d="M85 209 Q98 214 110 209" fill="none" stroke="#67e8f9" strokeWidth="1.6" />
          <path d="M84 222 C94 226, 112 226, 122 222" fill="none" stroke="#5eead4" strokeWidth="1.4" />
        </g>

        {/* ================= CASCO ESFÉRICO CON VISOR Y AURICULAR ================= */}
        <g className="holo-helmet">
          {/* Anillo doble del cuello */}
          <path
            d="M81 58 C88 65, 109 66, 116 58 L118 63 C110 71, 87 70, 79 62 Z"
            fill="url(#holoSuitBack)"
            stroke="#67e8f9"
            strokeWidth="1.7"
            strokeLinejoin="round"
          />

          {/* Domo del casco */}
          <path
            d="M78 44 C78 24, 92 14, 107 16 C122 18, 131 30, 129 46 C128 57, 119 64, 104 64 C89 64, 78 56, 78 44 Z"
            fill="url(#holoHelmet)"
            stroke="#67e8f9"
            strokeWidth="2"
          />

          {/* Marco del visor */}
          <path
            d="M94 26 C108 21, 124 27, 126 41 C128 53, 117 61, 103 59 C92 57, 88 48, 89 37 C90 31, 91 28, 94 26 Z"
            fill="url(#holoVisor)"
            stroke="#67e8f9"
            strokeWidth="1.9"
          />

          {/* Brillo creciente turquesa en el lado derecho del visor */}
          <path
            d="M115 27 C122 32, 125 42, 121 51 C118 56, 112 58, 106 58 C113 55, 117 48, 117 39 C117 33, 116 29, 115 27 Z"
            fill="#5eead4"
            opacity="0.75"
          />

          {/* Auricular / cápsula lateral izquierda del casco */}
          <rect
            x="82"
            y="38"
            width="7"
            height="11"
            rx="3.5"
            fill="url(#holoSuit)"
            stroke="#67e8f9"
            strokeWidth="1.6"
          />
          <rect x="84" y="41" width="3" height="5" rx="1.5" fill="#13313e" stroke="#5eead4" strokeWidth="1" />
        </g>

        {/* ================= BRAZO DERECHO (DELANTERO IZQUIERDO) ================= */}
        <g className="limb-arm-front">
          {/* Hombro y brazo cayendo hacia la izquierda */}
          <path
            d="M78 67 C68 71, 60 83, 55 98 C51 108, 49 118, 49 125 L64 127 C66 118, 69 109, 73 101 C77 93, 82 86, 86 81 Z"
            fill="url(#holoSuit)"
            stroke="#67e8f9"
            strokeWidth="1.9"
            strokeLinejoin="round"
          />

          {/* Parche del hombro */}
          <path
            d="M66 77 L76 82 L72 90 L61 85 Z"
            fill="none"
            stroke="#5eead4"
            strokeWidth="1.3"
            opacity="0.8"
          />

          {/* Pliegues del codo */}
          <path d="M56 97 Q64 101 71 99" fill="none" stroke="#5eead4" strokeWidth="1.4" opacity="0.8" />
          <path d="M54 102 Q62 106 69 104" fill="none" stroke="#5eead4" strokeWidth="1.4" opacity="0.8" />

          {/* Aro de muñeca */}
          <rect
            x="47"
            y="123"
            width="18"
            height="7"
            rx="3"
            transform="rotate(6 56 126)"
            fill="url(#holoSuit)"
            stroke="#67e8f9"
            strokeWidth="1.7"
          />

          {/* Mano / guante con dedos */}
          <path
            d="M48 130 C46 136, 46 144, 49 147 C51 149, 53 147, 54 144 C55 148, 58 148, 59 144 C60 147, 63 147, 63 143 C64 139, 64 134, 63 131 Z"
            fill="url(#holoSuit)"
            stroke="#67e8f9"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          {/* Pulgar interno */}
          <path
            d="M62 132 C66 135, 68 139, 66 142 C64 143, 62 140, 61 136"
            fill="url(#holoSuit)"
            stroke="#67e8f9"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </g>
      </g>
    </svg>
  );
}

export default Astronaut;
