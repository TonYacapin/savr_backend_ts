import { Request, Response } from 'express';
import * as SavingsService from './savings.service';

export const createSavingsPlan = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, goalName, targetAmount } = req.body;
    const savings = await SavingsService.createSavingsPlan(userId, goalName, targetAmount);
    res.status(201).json(savings);
  } catch (error) {
    res.status(500).json({ message: 'Error creating savings plan', error: (error as Error).message });
  }
};

export const addSavings = async (req: Request, res: Response): Promise<void> => {
    try {
      const { userId, savingsId, amount } = req.body; // Include userId in the request body
      const savings = await SavingsService.addSavings(userId, savingsId, amount); // Pass userId to the service
      res.status(200).json(savings);
    } catch (error) {
      res.status(500).json({ message: 'Error adding savings', error: (error as Error).message });
    }
  };

  
export const getSavingsPlans = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;
    const savingsPlans = await SavingsService.getSavingsPlans(userId);
    res.status(200).json(savingsPlans);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching savings plans', error: (error as Error).message });
  }
};