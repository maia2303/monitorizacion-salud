
import express from 'express';
import db from './config/db.js';
import panasRoutes from './modules/panas/panasRoutes.js';

const app = express();

app.use(express.json());

// Rutas PANAS
app.use('/api/panas', panasRoutes);

// Verificar servidor
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Verificar MySQL
app.get('/api/db/health', async (req, res) => {
  try {
    await db.query('SELECT 1');

    res.json({
      status: 'ok',
      database: 'connected'
    });
  } catch (error) {
    console.error('ERROR MYSQL:', error.code);

    res.status(503).json({
      status: 'error',
      database: 'disconnected'
    });
  }
});

export default app;
