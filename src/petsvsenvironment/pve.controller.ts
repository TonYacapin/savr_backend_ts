import { Request, Response } from 'express';
import * as PvEService from './pve.service';

export const startBattle = async (req: Request, res: Response): Promise<void> => {
  try {
    const { petId, environment } = req.body;
    const battle = await PvEService.startBattle(petId, environment);
    res.status(201).json(battle);
  } catch (error) {
    res.status(500).json({ message: 'Error starting battle', error: (error as Error).message });
  }
};

export const getBattleHistory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { petId } = req.params;
    const history = await PvEService.getBattleHistory(petId);
    res.status(200).json(history);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching battle history', error: (error as Error).message });
  }
};