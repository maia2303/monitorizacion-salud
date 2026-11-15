import { Router } from 'express';
import { sincronizarQUS, obtenerSimulacionQUS } from './qusController.js';

const router = Router();

// POST /api/qus/sincronizar
router.post('/sincronizar', sincronizarQUS);

// GET /api/qus/simulacion
router.get('/simulacion', obtenerSimulacionQUS);

export default router;

