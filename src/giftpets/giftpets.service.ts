import GiftPet, { IGiftPet } from './giftpets.model';
import Pet from '../pets/pets.model';
import User from '../users/users.model';

export const giftPet = async (
  senderId: string,
  receiverId: string,
  petId: string
): Promise<IGiftPet> => {
  // Validate sender
  const sender = await User.findById(senderId);
  if (!sender) {
    throw new Error('Sender not found');
  }

  // Validate receiver
  const receiver = await User.findById(receiverId);
  if (!receiver) {
    throw new Error('Receiver not found');
  }

  // Validate pet ownership
  const pet = await Pet.findById(petId);
  if (!pet) {
    throw new Error('Pet not found');
  }
  if (String(pet.owner) !== senderId) {
    throw new Error('You do not own this pet');
  }

  // Transfer pet ownership
  pet.owner = receiverId;
  await pet.save();

  // Log the gift transaction
  const gift = new GiftPet({
    sender: senderId,
    receiver: receiverId,
    pet: petId,
  });

  return await gift.save();
};

export const getGiftHistory = async (userId: string): Promise<IGiftPet[]> => {
  return await GiftPet.find({
    $or: [{ sender: userId }, { receiver: userId }],
  })
    .populate('sender', 'name email')
    .populate('receiver', 'name email')
    .populate('pet', 'name type rarity');
};