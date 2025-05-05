import { Request, Response } from 'express';
import * as GiftPetService from './giftpets.service';

export const giftPet = async (req: Request, res: Response): Promise<void> => {
  try {
    const { senderId, receiverId, petId } = req.body;
    const gift = await GiftPetService.giftPet(senderId, receiverId, petId);
    res.status(201).json(gift);
  } catch (error) {
    res.status(500).json({ message: 'Error gifting pet', error: (error as Error).message });
  }
};

export const getGiftHistory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;
    const history = await GiftPetService.getGiftHistory(userId);
    res.status(200).json(history);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching gift history', error: (error as Error).message });
  }
};