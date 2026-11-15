const PESTAÑAS = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'salud', label: 'Escaneo Óseo' },
  { id: 'pvt', label: 'Test PVT' },
  { id: 'animo', label: 'Bienestar' },
];

function Navbar({ pestanaActiva, setPestanaActiva, estadoSalud, cambiarEscenario, escenarios }) {
  return (
    <header className="navbar">
      <div className="navbar-left">
        <div className="brand">
          <span className="brand-icon">🌐</span>
          <span className="brand-name">BioAstro</span>
        </div>
        <nav className="nav-links">
          {PESTAÑAS.map((tab) => (
            <button
              key={tab.id}
              className={`nav-btn ${pestanaActiva === tab.id ? 'active' : ''}`}
              onClick={() => setPestanaActiva(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* SELECTOR DE DEMO PARA EL JURADO + INFO DE MISIÓN */}
      <div className="navbar-right">
        <div className="demo-selector">
          <span className="demo-label">Simular estado:</span>
          {Object.keys(escenarios).map((clave) => (
            <button
              key={clave}
              className={`demo-pill ${estadoSalud.id === clave ? 'active' : ''}`}
              onClick={() => cambiarEscenario(clave)}
            >
              {escenarios[clave].nombre}
            </button>
          ))}
        </div>
        <div className="mission-badge">ROVER LUNAR · ARTEMIS</div>
      </div>
    </header>
  );
}

export default Navbar;
