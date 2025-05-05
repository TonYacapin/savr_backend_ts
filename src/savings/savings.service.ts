import Savings, { ISavings } from './savings.model';
import Pet from '../pets/pets.model';

// List of available pet types (emojis)
// List of available pet types (emojis)
const petTypes = [
    '🐶', '🐱', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐸', // Original list
    '🐔', '🐧', '🐦', '🐤', '🦆', '🦅', '🦉', '🦇', '🐺', '🐗', // Birds and wild animals
    '🐴', '🦄', '🐝', '🐛', '🦋', '🐌', '🐞', '🐜', '🦂', '🐢', // Insects and reptiles
    '🐍', '🦎', '🦖', '🦕', '🐙', '🦑', '🦐', '🦀', '🐡', '🐠', // Dinosaurs and aquatic animals
    '🐟', '🐬', '🐳', '🐋', '🦈', '🐊', '🐅', '🐆', '🦓', '🦍', // More aquatic and wild animals
    '🦧', '🦣', '🦛', '🦏', '🐪', '🐫', '🦒', '🦘', '🦥', '🦦', // Exotic animals
    '🦨', '🦡', '🐘', '🐃', '🐂', '🐄', '🐎', '🐖', '🐏', '🐑', // Farm animals
    '🦙', '🐐', '🦌', '🐕', '🐩', '🐈', '🐓', '🦃', '🦜', '🦚', // Domesticated animals and birds
    '🦢', '🦩', '🕊️', '🐇', '🐿️', '🦔' // Small animals and birds
];

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

        // Randomize pet type, stats, rarity, and special ability
        const randomPetType = petTypes[Math.floor(Math.random() * petTypes.length)];
        const randomStats = {
            strength: Math.floor(Math.random() * 10) + 1, // Random strength between 1 and 10
            agility: Math.floor(Math.random() * 10) + 1,  // Random agility between 1 and 10
            intelligence: Math.floor(Math.random() * 10) + 1, // Random intelligence between 1 and 10
        };
        const randomAbility = specialAbilities[Math.floor(Math.random() * specialAbilities.length)];
        const rarities = ['common', 'uncommon', 'rare', 'epic', 'legendary']; // List of rarities
        const randomRarity = rarities[Math.floor(Math.random() * rarities.length)]; // Random rarity

        // Generate a random name for the pet
        const randomNumber = Math.floor(Math.random() * 10000); // Random number between 0 and 9999
        const petName = `Saver ${randomNumber}`;

        // Reward the user with a randomized pet
        const pet = new Pet({
            name: petName, // Use the generated name
            stats: randomStats,
            rarity: randomRarity, // Assign the randomized rarity
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