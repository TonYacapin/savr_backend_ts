import { Router } from 'express';
import * as PetController from './pets.controller';

const router = Router();

router.post('/', PetController.createPet); // Create a new pet
router.get('/', PetController.getAllPets); // Get all pets
router.get('/:id', PetController.getPetById); // Get a pet by ID
router.put('/:id', PetController.updatePet); // Update a pet by ID
router.delete('/:id', PetController.deletePet); // Delete a pet by ID

export default router;