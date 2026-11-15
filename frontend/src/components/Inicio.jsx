import React, { useState } from 'react';
import Perfil from './Perfil';
import ActividadDiaria from './ActividadDiaria';

export default function Inicio() {
  const [autenticado, setAutenticado] = useState(null);

  if (!autenticado) {
    return <Perfil onIniciarSesion={(id) => setAutenticado(id)} />;
  }

  return (
    <ActividadDiaria
      astronauta={
        autenticado === 'grace'
          ? { nombre: 'Cmdr. Grace K. Wilson', tripulacion: 'Crew A' }
          : { nombre: 'Pilot Rocky C. Mendoza', tripulacion: 'Crew A' }
      }
    />
  );
}
