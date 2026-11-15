
import { Router } from 'express';
import { analizarSueno } from './suenoController.js';

const router = Router();

// POST /api/sueno/analizar
router.post('/analizar', analizarSueno);

export default router;
