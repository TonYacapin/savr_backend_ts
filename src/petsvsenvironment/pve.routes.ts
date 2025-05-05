import { Router } from 'express';
import * as PvEController from './pve.controller';

const router = Router();

router.post('/battle', PvEController.startBattle); // Start a new battle
router.get('/history/:petId', PvEController.getBattleHistory); // Get battle history for a pet

export default router;