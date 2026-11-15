function PreventiveBanner({ mensaje }) {
  return (
    <footer className="preventive-banner">
      <span className="bulb-icon">💡</span>
      <p className="preventive-text">
        <strong>RECOMENDACIÓN PREVENTIVA:</strong> {mensaje}
      </p>
    </footer>
  );
}

export default PreventiveBanner;
