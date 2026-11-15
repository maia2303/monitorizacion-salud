function SecondaryView({ pestanaActiva, onVolver }) {
  return (
    <main className="secondary-view">
      <div className="placeholder-card">
        <h2>Módulo: {pestanaActiva.toUpperCase()}</h2>
        <p>
          Aquí puedes conectar el componente secundario (ej. Test PVT de reflejos con ratón o
          galería de muestras de ultrasonido de talón).
        </p>
        <button className="nav-btn active" onClick={onVolver}>
          Volver al Astronauta
        </button>
      </div>
    </main>
  );
}

export default SecondaryView;
