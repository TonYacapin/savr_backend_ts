import mongoose, { Schema, Document } from 'mongoose';
import { IPet } from '../pets/pets.model';

export interface IPvE extends Document {
  pet: IPet['_id']; // Reference to the Pet model
  environment: string; // Description of the environment (e.g., "forest", "desert")
  outcome: 'win' | 'lose' | 'draw'; // Result of the battle
  experienceGained: number; // Experience gained by the pet
  createdAt: Date;
  updatedAt: Date;
}

const PvESchema: Schema = new Schema<IPvE>(
  {
    pet: { type: mongoose.Schema.Types.ObjectId, ref: 'Pet', required: true },
    environment: { type: String, required: true },
    outcome: { type: String, enum: ['win', 'lose', 'draw'], required: true },
    experienceGained: { type: Number, required: true },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const PvE = mongoose.model<IPvE>('PvE', PvESchema);

export default PvE;