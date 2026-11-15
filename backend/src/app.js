
import express from 'express';
import db from './config/db.js';
import cors from 'cors';
import criRoutes from './modules/cri/criRoutes.js';

import panasRoutes from './modules/panas/panasRoutes.js';
import suenoRoutes from './modules/sueno/suenoRoutes.js';
import bitacorasRoutes from './modules/bitacoras/bitacorasRoutes.js';

const app = express();
app.use(cors({ origin: ['http://localhost:5173', 'http://127.0.0.1:5173', 'http://localhost:5174'] }));
app.use(express.json());

// Rutas de los test
app.use('/api/panas', panasRoutes);
app.use('/api/sueno', suenoRoutes);
app.use('/api/bitacoras', bitacorasRoutes);
app.use('/api/cri', criRoutes);

// Verificar servidor
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Verificar conexión con MySQL
app.get('/api/db/health', async (req, res) => {
  try {
    await db.query('SELECT 1');

    res.json({
      status: 'ok',
      database: 'connected'
    });

  } catch (error) {
    console.error('ERROR MYSQL:', error.code);
     console.error('DETALLE:', error.message);

    res.status(503).json({
      status: 'error',
      database: 'disconnected'
    });
  }
});

app.get('/api/db/tablas', async (req, res) => {
  try {
    const [tablas] = await db.query('SHOW TABLES');

    res.status(200).json({
      mensaje: 'Tablas encontradas correctamente',
      tablas
    });

  } catch (error) {
    console.error('Error MySQL:', error.code);

    res.status(503).json({
      mensaje: 'No se pudieron consultar las tablas'
    });
  }
});


export default app;
