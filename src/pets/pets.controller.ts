import { Request, Response } from 'express';
import * as PetService from './pets.service';

export const createPet = async (req: Request, res: Response): Promise<void> => {
  try {
    const pet = await PetService.createPet(req.body);
    res.status(201).json(pet);
  } catch (error) {
    res.status(500).json({ message: 'Error creating pet', error });
  }
};

export const getAllPets = async (_req: Request, res: Response): Promise<void> => {
  try {
    const pets = await PetService.getAllPets();
    res.status(200).json(pets);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching pets', error });
  }
};

export const getPetById = async (req: Request, res: Response): Promise<void> => {
  try {
    const pet = await PetService.getPetById(req.params.id);
    if (!pet) {
      res.status(404).json({ message: 'Pet not found' });
      return;
    }
    res.status(200).json(pet);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching pet', error });
  }
};

export const updatePet = async (req: Request, res: Response): Promise<void> => {
  try {
    const pet = await PetService.updatePet(req.params.id, req.body);
    if (!pet) {
      res.status(404).json({ message: 'Pet not found' });
      return;
    }
    res.status(200).json(pet);
  } catch (error) {
    res.status(500).json({ message: 'Error updating pet', error });
  }
};

export const deletePet = async (req: Request, res: Response): Promise<void> => {
  try {
    const pet = await PetService.deletePet(req.params.id);
    if (!pet) {
      res.status(404).json({ message: 'Pet not found' });
      return;
    }
    res.status(200).json({ message: 'Pet deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting pet', error });
  }
};