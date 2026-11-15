
import { Router } from 'express';
import { analizarCRI } from './criController.js';

const router = Router();

router.post('/calcular', analizarCRI);

export default router;
