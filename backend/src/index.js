import 'dotenv/config';
import express from 'express';
import mysql from 'mysql2/promise';

const app = express();
const port = Number(process.env.PORT ?? 3000);

const database = mysql.createPool({
  host: process.env.DB_HOST ?? 'localhost',
  port: Number(process.env.DB_PORT ?? 3306),
  user: process.env.DB_USER ?? 'root',
  password: process.env.DB_PASSWORD ?? '',
  database: process.env.DB_NAME ?? 'monitorizacion_salud',
  waitForConnections: true,
  connectionLimit: 10,
});

app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok' });
});

app.get('/api/db/health', async (_request, response) => {
  try {
    await database.query('SELECT 1');
    response.json({ status: 'ok', database: 'connected' });
  } catch (error) {
    console.error('No se pudo conectar a MySQL:', error.message);
    response.status(503).json({
      status: 'error',
      database: 'disconnected',
      message: 'No se pudo conectar a MySQL. Revisa la configuración del backend.',
    });
  }
});

app.listen(port, () => {
  console.log(`Backend escuchando en http://localhost:${port}`);
});
