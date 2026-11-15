
import { Router } from 'express';
import { crearBitacora } from './bitacorasController.js';

const router = Router();

// POST /api/bitacoras
router.post('/', crearBitacora);

export default router;
