import { Router } from 'express';
import * as GiftPetController from './giftpets.controllers';

const router = Router();

// Route to gift a pet
router.post('/gift', GiftPetController.giftPet);

// Route to get gift history for a user
router.get('/history/:userId', GiftPetController.getGiftHistory);

export default router;