
import { Router } from 'express';
import { analizarPANAS } from './panasController.js';

const router = Router();

// POST /api/panas/analizar
router.post('/analizar', analizarPANAS);

export default router;
