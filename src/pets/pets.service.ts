import Pet, { IPet } from './pets.model';

export const createPet = async (petData: Partial<IPet>): Promise<IPet> => {
  const pet = new Pet(petData);
  return await pet.save();
};

export const getAllPets = async (): Promise<IPet[]> => {
  return await Pet.find().populate('owner');
};

export const getPetById = async (id: string): Promise<IPet | null> => {
  return await Pet.findById(id).populate('owner');
};

export const updatePet = async (id: string, petData: Partial<IPet>): Promise<IPet | null> => {
  return await Pet.findByIdAndUpdate(id, petData, { new: true, runValidators: true });
};

export const deletePet = async (id: string): Promise<IPet | null> => {
  return await Pet.findByIdAndDelete(id);
};