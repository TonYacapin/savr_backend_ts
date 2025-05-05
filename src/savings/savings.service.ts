import Savings, { ISavings } from './savings.model';
import Pet from '../pets/pets.model';

// List of available pet types (emojis)
const petTypes = ['🐶', '🐱', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐸'];

// List of possible special abilities
const specialAbilities = [
  'Loyal Companion',
  'Swift Runner',
  'Sharp Thinker',
  'Fearless Fighter',
  'Stealth Master',
  'Healing Aura',
  'Fire Breather',
  'Ice Shield',
  'Thunder Strike',
  'Nature’s Guardian',
];

/**
 * Create a new savings plan for a user.
 */
export const createSavingsPlan = async (
  userId: string,
  goalName: string,
  targetAmount: number
): Promise<ISavings> => {
  const savings = new Savings({
    user: userId,
    goalName,
    targetAmount,
    currentAmount: 0, // Always start with 0
    isCompleted: false,
    transactions: [], // Initialize with an empty transaction array
  });
  return await savings.save();
};

/**
 * Add savings to an existing savings plan.
 */
export const addSavings = async (
  userId: string,
  savingsId: string,
  amount: number
): Promise<ISavings | null> => {
  const savings = await Savings.findById(savingsId);
  if (!savings) {
    throw new Error('Savings plan not found');
  }

  // Validate ownership
  if (String(savings.user) !== userId) {
    throw new Error('You are not authorized to add savings to this plan');
  }

  // Log the transaction
  savings.transactions.push({ amount, date: new Date() });

  // Incrementally add the amount to currentAmount
  savings.currentAmount += amount;

  // Check if the savings goal is completed
  if (savings.currentAmount >= savings.targetAmount) {
    savings.isCompleted = true;

    // Randomize pet type, stats, and special ability
    const randomPetType = petTypes[Math.floor(Math.random() * petTypes.length)];
    const randomStats = {
      strength: Math.floor(Math.random() * 10) + 1, // Random strength between 1 and 10
      agility: Math.floor(Math.random() * 10) + 1,  // Random agility between 1 and 10
      intelligence: Math.floor(Math.random() * 10) + 1, // Random intelligence between 1 and 10
    };
    const randomAbility = specialAbilities[Math.floor(Math.random() * specialAbilities.length)];

    // Reward the user with a randomized pet
    const pet = new Pet({
      name: `Reward Pet ${randomPetType}`,
      stats: randomStats,
      rarity: 'rare',
      type: randomPetType,
      level: 1,
      experience: 0,
      specialAbility: randomAbility, // Assign the randomized ability
      owner: savings.user,
    });
    await pet.save();
  }

  return await savings.save();
};

/**
 * Get all savings plans for a specific user.
 */
export const getSavingsPlans = async (userId: string): Promise<ISavings[]> => {
  return await Savings.find({ user: userId });
};