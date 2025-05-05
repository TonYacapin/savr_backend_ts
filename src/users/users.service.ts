import User, { IUser } from './users.model';
import Pet from '../pets/pets.model';
import jwt from 'jsonwebtoken';

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

// List of rarities
const rarities = ['common', 'uncommon', 'rare', 'epic', 'legendary'];

export const loginUser = async (email: string, password: string): Promise<{ token: string; petReward?: any } | null> => {
  const user = await User.findOne({ email });
  if (!user) return null;

  const isMatch = await user.comparePassword(password);
  if (!isMatch) return null;

  // Check if the user has any existing pets
  const existingPets = await Pet.find({ owner: user._id });
  let petReward = null;

  if (existingPets.length === 0) {
    // Randomize pet type, stats, rarity, and special ability
    const randomPetType = petTypes[Math.floor(Math.random() * petTypes.length)];
    const randomStats = {
      strength: Math.floor(Math.random() * 10) + 1, // Random strength between 1 and 10
      agility: Math.floor(Math.random() * 10) + 1,  // Random agility between 1 and 10
      intelligence: Math.floor(Math.random() * 10) + 1, // Random intelligence between 1 and 10
    };
    const randomAbility = specialAbilities[Math.floor(Math.random() * specialAbilities.length)];
    const randomRarity = rarities[Math.floor(Math.random() * rarities.length)];

    // Generate a random name for the pet
    const randomNumber = Math.floor(Math.random() * 10000); // Random number between 0 and 9999
    const petName = `Beginner ${randomNumber}`;

    // Create the beginner pet
    const pet = new Pet({
      name: petName,
      stats: randomStats,
      rarity: randomRarity,
      type: randomPetType,
      level: 1,
      experience: 0,
      specialAbility: randomAbility,
      owner: user._id,
    });
    petReward = await pet.save();
  }

  // Generate a JWT token
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'default_secret', { expiresIn: '1h' });

  return { token, petReward };
};
export const getAllUsers = async (): Promise<IUser[]> => {
    return await User.find();
};

export const getUserById = async (id: string): Promise<IUser | null> => {
    return await User.findById(id);
};

export const createUser = async (userData: Partial<IUser>): Promise<IUser> => {
    const user = new User(userData);
    return await user.save();
};

export const updateUser = async (id: string, userData: Partial<IUser>): Promise<IUser | null> => {
    return await User.findByIdAndUpdate(id, userData, { new: true, runValidators: true });
};

export const deleteUser = async (id: string): Promise<IUser | null> => {
    return await User.findByIdAndDelete(id);
};