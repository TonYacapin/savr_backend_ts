import { Router } from 'express';
import * as SavingsController from './savings.controller';

const router = Router();

router.post('/', SavingsController.createSavingsPlan); // Create a new savings plan
router.post('/add', SavingsController.addSavings); // Add savings to a plan
router.get('/:userId', SavingsController.getSavingsPlans); // Get all savings plans for a user

export default router;