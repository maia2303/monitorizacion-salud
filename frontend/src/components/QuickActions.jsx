function QuickActions({ sumarActividad, sumarAgua }) {
  return (
    <div className="quick-actions">
      <button className="action-chip chip-activity" onClick={sumarActividad}>
        + Sumar 15m Carga Ósea
      </button>
      <button className="action-chip chip-water" onClick={sumarAgua}>
        + Beber 250 ml Agua
      </button>
    </div>
  );
}

export default QuickActions;
