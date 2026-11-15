import { useState } from 'react';
import './App.css';
import Perfil from './components/Perfil';
import ActividadDiaria from './components/ActividadDiaria';
import ControlOrina from './components/Analisis/ControlOrina';
import TestPVC from './components/Analisis/TestPVC';
import TestQUS from './components/Analisis/TestQUS';

function App() {
  // 1. Estado de autenticación: null indica que no se ha iniciado sesión todavía
  const [astronautaAutenticado, setAstronautaAutenticado] = useState(null);
  const [pestanaActiva, setPestanaActiva] = useState('inicio');

  // Si no ha iniciado sesión, lo primero que ven los astronautas es Perfil (sin navbar)
  if (!astronautaAutenticado) {
    return (
      <Perfil
        onIniciarSesion={(tripulanteId) => {
          setAstronautaAutenticado(tripulanteId);
          setPestanaActiva('inicio');
        }}
      />
    );
  }

  // Una vez iniciada la sesión, se accede a los datos y a las vistas con navegación
  const datosAstronauta =
    astronautaAutenticado === 'grace'
      ? { nombre: 'Cmdte. Grace K. Wilson', tripulacion: 'Tripulación A' }
      : { nombre: 'Piloto Rocky C. Mendoza', tripulacion: 'Tripulación A' };

  return (
    <div className="min-h-screen w-full bg-[#0b1220] text-slate-100 flex flex-col justify-between selection:bg-cyan-500 selection:text-slate-900 relative">
      
      {/* Botón flotante para cerrar sesión y volver a Perfil */}
      <div className="absolute top-4 right-4 sm:right-6 z-50">
        <button
          type="button"
          onClick={() => setAstronautaAutenticado(null)}
          className="bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 px-3.5 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1.5 shadow-md cursor-pointer transition-all"
          title="Cerrar sesión del astronauta"
        >
          <span>👤 {datosAstronauta.nombre.split(' ')[1]}</span>
          <span className="text-slate-500">|</span>
          <span className="text-cyan-400 hover:underline">Cambiar Perfil</span>
        </button>
      </div>

      {/* VISTAS PRINCIPALES AUTENTICADAS */}
      <div className="flex-1 flex flex-col">
        {pestanaActiva === 'inicio' && (
          <ActividadDiaria
            astronauta={datosAstronauta}
            onCambiarPestana={setPestanaActiva}
          />
        )}

        {pestanaActiva === 'test_orina' && (
          <ControlOrina
            onVolver={() => setPestanaActiva('inicio')}
            onCambiarPestana={setPestanaActiva}
          />
        )}

        {pestanaActiva === 'test_pvc' && (
          <TestPVC
            perfilActivo={astronautaAutenticado}
            onVolver={() => setPestanaActiva('inicio')}
          />
        )}

        {pestanaActiva === 'test_qus' && (
          <TestQUS
            perfilActivo={astronautaAutenticado}
            onVolver={() => setPestanaActiva('inicio')}
          />
        )}
      </div>

    </div>
  );
}

export default App;
