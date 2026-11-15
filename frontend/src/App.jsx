import { useState, useEffect } from 'react';
import './App.css';
import { ESCENARIOS } from './data/escenarios';
import Navbar from './components/Navbar';
import ProgressRings from './components/ProgressRings';
import LunarViewport from './components/LunarViewport';
import QuickActions from './components/QuickActions';
import PreventiveBanner from './components/PreventiveBanner';
import SecondaryView from './components/SecondaryView';

function App() {
  const [pestanaActiva, setPestanaActiva] = useState('inicio');

  // Estado persistente en localStorage para la demo autoguiada del jurado
  const [estadoSalud, setEstadoSalud] = useState(() => {
    const guardado = localStorage.getItem('bioastro_estado');
    return guardado ? JSON.parse(guardado) : ESCENARIOS.optimo;
  });

  useEffect(() => {
    localStorage.setItem('bioastro_estado', JSON.stringify(estadoSalud));
  }, [estadoSalud]);

  const cambiarEscenario = (clave) => {
    setEstadoSalud(ESCENARIOS[clave]);
  };

  const sumarAgua = () => {
    setEstadoSalud((prev) => {
      const nuevaHidratacion = Math.min(100, prev.hidratacion + 12);
      return {
        ...prev,
        hidratacion: nuevaHidratacion,
        mensaje:
          nuevaHidratacion >= 80
            ? '¡Hidratación en nivel ideal! Tus riñones y tu concentración están protegidos para el resto de la jornada lunar.'
            : prev.mensaje,
      };
    });
  };

  const sumarActividad = () => {
    setEstadoSalud((prev) => {
      const nuevaActividad = Math.min(100, prev.actividad + 10);
      return {
        ...prev,
        actividad: nuevaActividad,
        mensaje:
          nuevaActividad >= 90
            ? '¡Escudo óseo del día alcanzado! El impacto mecánico de hoy protege tu densidad ósea en la Luna. Recuerda acompañar con agua.'
            : prev.mensaje,
      };
    });
  };

  return (
    <div className="app-container">
      <Navbar
        pestanaActiva={pestanaActiva}
        setPestanaActiva={setPestanaActiva}
        estadoSalud={estadoSalud}
        cambiarEscenario={cambiarEscenario}
        escenarios={ESCENARIOS}
      />

      {pestanaActiva === 'inicio' ? (
        <main className="main-stage">
          <div className="center-hub">
            <ProgressRings
              actividad={estadoSalud.actividad}
              hidratacion={estadoSalud.hidratacion}
            />

            <LunarViewport velocidadCaminata={estadoSalud.velocidadCaminata} />

            <QuickActions
              sumarActividad={sumarActividad}
              sumarAgua={sumarAgua}
            />
          </div>

          <PreventiveBanner mensaje={estadoSalud.mensaje} />
        </main>
      ) : (
        <SecondaryView
          pestanaActiva={pestanaActiva}
          onVolver={() => setPestanaActiva('inicio')}
        />
      )}
    </div>
  );
}

export default App;
