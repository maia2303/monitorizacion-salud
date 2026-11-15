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
          ? { nombre: 'Cmdte. Grace K. Wilson', tripulacion: 'Tripulación A' }
          : { nombre: 'Piloto Rocky C. Mendoza', tripulacion: 'Tripulación A' }
      }
    />
  );
}
