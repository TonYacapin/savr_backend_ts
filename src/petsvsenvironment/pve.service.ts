import PvE, { IPvE } from './pve.model';
import Pet from '../pets/pets.model';

export const startBattle = async (
    petId: string,
    environment: string
  ): Promise<IPvE | null> => {
    const pet = await Pet.findById(petId);
    if (!pet) {
      throw new Error('Pet not found');
    }
  
    // Simulate battle logic
    const petPower = pet.stats.strength + pet.stats.agility + pet.stats.intelligence;
    const environmentPower = Math.floor(Math.random() * 100); // Random environment difficulty
  
    let outcome: 'win' | 'lose' | 'draw';
    let experienceGained = 0;
  
    if (petPower > environmentPower) {
      outcome = 'win';
      experienceGained = 50; // Example experience for a win
    } else if (petPower < environmentPower) {
      outcome = 'lose';
      experienceGained = 10; // Example experience for a loss
    } else {
      outcome = 'draw';
      experienceGained = 20; // Example experience for a draw
    }
  
    // Update pet experience and level
    pet.experience += experienceGained;
    if (pet.experience >= pet.level * 100) {
      pet.level += 1;
      pet.experience = 0; // Reset experience after leveling up
  
      // Increase pet stats on level-up
      pet.stats.strength += 5; // Increment strength by 5
      pet.stats.agility += 3;  // Increment agility by 3
      pet.stats.intelligence += 2; // Increment intelligence by 2
    }
    await pet.save();
  
    // Save battle result
    const battle = new PvE({
      pet: pet._id,
      environment,
      outcome,
      experienceGained,
    });
  
    return await battle.save();
  };

export const getBattleHistory = async (petId: string): Promise<IPvE[]> => {
  return await PvE.find({ pet: petId }).populate('pet');
};