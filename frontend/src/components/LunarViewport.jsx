import Astronaut from './Astronaut';

function LunarViewport({ velocidadCaminata }) {
  return (
    <div
      className="lunar-viewport"
      style={{ '--walk-speed': velocidadCaminata }}
    >
      {/* Estrellas y la Tierra a lo lejos */}
      <div className="stars-bg"></div>
      <div className="earth-globe" title="Tierra a 384.400 km"></div>

      {/* Astronauta articulado en loop */}
      <Astronaut />

      {/* Suelo Lunar en movimiento con cráteres */}
      <div className="lunar-ground">
        <div className="lunar-craters-track">
          <span className="crater c1"></span>
          <span className="crater c2"></span>
          <span className="crater c3"></span>
          <span className="crater c4"></span>
        </div>
      </div>

      <span className="lunar-badge">GRAVEDAD LUNAR: 1.62 m/s²</span>
    </div>
  );
}

export default LunarViewport;
